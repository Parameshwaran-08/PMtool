const getListItems = async () => {
  const response = await fetch(
    "https://crm581985.sharepoint.com/sites/ProjectManagerTool/_api/web/lists/getbytitle('effort_tracking')/items",
    {
      headers: {
        withCredentials: true,
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY3JtNTgxOTg1LnNoYXJlcG9pbnQuY29tQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsImlzcyI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJpYXQiOjE3MTg1OTc1MTMsIm5iZiI6MTcxODU5NzUxMywiZXhwIjoxNzE4Njg0MjEzLCJpZGVudGl0eXByb3ZpZGVyIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsIm5hbWVpZCI6ImNjNjFiZDcyLTE0MTMtNDIwNi1iODcxLTM0OWMyODk4NGRjNEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJvaWQiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJzdWIiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6ImZhbHNlIn0.Bfif7E-NA6W4qFzZd9IAUlo1HL6OlPFHDS4uVhliukMZZJFa_ENESvEPFn3BMyDBPKv1TVBHS1Gf7yoEngvVAsmSy4JCErapWNsz_zNnT8EHOFAbZ-pkcKDeJG5SLThNY6P0XWIdXTWoSrlUz5Ginou0PJDCpvczOGwZeocP8VzONnklNr3md8cXzE5xdGk45g15kej92DR16pgXtlkK06ZhkHk159Jbmx6VDawsWHCdTqiJO2rPjn8tdbOODYM1MWyAORbKzQ7MvIHvuwZI47rglekmPVTAdwAlsoGG7_nw7t6wbJFAbZ0V6kxkF7-dPFCDHXlfV_B3l1Rcu2v1og",
      },
    }
  );

  const result = await response.json();
  const data = result.value.map((item) => {
    return {
      title: item["Title"],
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

document.addEventListener("DOMContentLoaded", async (event) => {
  const data = await getListItems();
  // <th>Resource Name</th>
  // <th>Resource SAP ID</th>
  // <th>EUR/Hour</th>
  // <th>Budget Hours</th>
  // <th>Actual Hours</th>
  // <th>Actions</th>

  data.forEach((element) => {
    const totalTimePerMonth = element.week1
    ? Number(element.week1)
    : 0 + element.week2
    ? Number(element.week2)
    : 0 + element.week3
    ? Number(element.week3)
    : 0 + element.week4
    ? Number(element.week4)
    : 0;
    const table = document
      .getElementById("tab")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    [
      element.title,
      element.sapId,
      element.resourceRole,
      element.month,
      element.year,
      "160 Euros",
      totalTimePerMonth,
      "dummy actions",
    ].forEach((item, index) => {
      const cell = newRow.insertCell(index);
      cell.innerHTML = item;
    });
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
