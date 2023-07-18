
//this function is used to group together related test cases together, essentially testing the setup and tear down of servers
describe("Servers test (with setup and tear-down)", function() {
  //the beforeEach function describes what action to take before each test is performed 
  //in this case,the serverName value is set to 'Alice'
  beforeEach(function () {
    serverNameInput.value = 'Alice';
  });

  //the it function is used to define an individual test case within the grouping, taking the description of the test as the first argument and the actual function as the second argument, calling submitServerInfo in this case
  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    //first test case is checking whether a new server is added to the allServers object when the function is called 
    expect(Object.keys(allServers).length).toEqual(1);//we are getting all of the object keys from the object 'allServers' and seeing what their length is, to see if a server actually exists

    //'allServers' is an object that contains infomration about servers, in this case it is empty in the servers.js file when initialized 
    //we are then combining the string 'server' with the variable serverID to create a server key 
    // we are then checking to see if the server name Alice exists 
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a new server on submitServerInfo() with empty input', function () {
    serverNameInput.value = ''; //setting the serverInput to empty to check the test 
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0); //the length of the allServers object should be 0 since no servers should have been populated 
  });

  // this third test verifies that the serverTable element is updated correcntly when both the submitServerInto and updateServerTable are called 
  it('should update #servertable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();

    //still a little unsure about this section here
    let curTdList = document.querySelectorAll('#serverTable tbody tr td');

    expect(curTdList.length).toEqual(3);
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$0.00');
    expect(curTdList[2].innerText).toEqual('X');
  });

  // we are essentially clearing the tests after each run and resettin the inputs 
  afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});