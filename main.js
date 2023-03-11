document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  let issues = [];
  const issue = { id, description, severity, assignedTo, status };
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const closeBtn = document.getElementById(id);
  closeBtn.innerText = 'Closed';
  const statusTagOfParent = closeBtn.parentNode.children[1];
  statusTagOfParent.innerText = 'Closed';
  const issues = JSON.parse(localStorage.getItem('issues'));
  const withoutCurrentIssue = issues.filter(issue => issue.id !== id);
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  withoutCurrentIssue.push(currentIssue)
  const issueStringified = JSON.stringify(withoutCurrentIssue);
  localStorage.setItem('issues', issueStringified);

}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id !== id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  const deleteBtn = document.getElementById(id);
  const parentDiv = deleteBtn.parentNode;
  parentDiv.style.display = 'none';
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p class="label label-info">${status}</p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" id="${id}" onclick="closeIssue('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" id="${id}" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}


