const getListItems = async () => {
  const response = await fetch(
    "https://crm581985.sharepoint.com/sites/ProjectManagerTool/_api/web/lists/getbytitle('effort_tracking')/items",
    {
      headers: {
        withCredentials: true,
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY3JtNTgxOTg1LnNoYXJlcG9pbnQuY29tQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsImlzcyI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJpYXQiOjE3MTg0OTY2NzMsIm5iZiI6MTcxODQ5NjY3MywiZXhwIjoxNzE4NTgzMzczLCJpZGVudGl0eXByb3ZpZGVyIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsIm5hbWVpZCI6ImNjNjFiZDcyLTE0MTMtNDIwNi1iODcxLTM0OWMyODk4NGRjNEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJvaWQiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJzdWIiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6ImZhbHNlIn0.T1lx6K-I725p0J9QOdi2hoyMowqwryBShCQ07komj-tARj7l_SQzoIRwQd4oLbaPHpZWaiFbRzlKh5gccyhn2mcA6gh_V1q-fKZhofDCDChaajjUaMbCXeDeQd752eWjgHVrJAB9ll9z96wE7TucPYUsqwM6ZzMfB5lVEOpWdmodExEMOQ93iJYpOeP98OZE2iTmMU-hgvudoEBtQztoJaIc3oO296ZHxgXUKP3zk_-rRn1yp1-3VmRKBI43tmWmNvJ7BqljgK61wkNbhw8RM86hgOMxVxBhxuMHSrYMiCbXSMLHKUUwpwkDM5058pi0C3k9NTGZgZ7I_-rl6b7QCQ",
      },
    }
  );

  const result = await response.json();
  const data = result.value.map((item) => {
    return {
      sapId: item["SapID"],
      resourceEmail: item["ResourceEmail"],
      week1: item["Week1"],
      week2: item["Week2"],
      week3: item["Week3"],
      week4: item["Week4"],
      month: item["Month"],
      year: item["Year"],
      resourceRole: item["ResourceRole"],
      approvalStatus: item["ApprovalStatus"],
      changeRequest: item["ChangeRequest"],
      id: item["ID"],
      eurPerHour: item["Eur_x002f_Hour"],
    };
  });
  return data;
};

document.addEventListener("DOMContentLoaded", (event) => {
  getListItems().then(function (response) {
    console.log("response>>>>>>   ", response);
    document.getElementById("tableWrap").append();
  });
});

const deleteListItem = async (id) => {
  const response = await fetch(
    `https://crm581985.sharepoint.com/sites/ProjectManagerTool/_api/web/lists/getbytitle('effort_tracking')/items/getbyid('${id}')`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        Authorization: "update with real auth token",
        "If-Match": "*",
      },
    }
  );
};
