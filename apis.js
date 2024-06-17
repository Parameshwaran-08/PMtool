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
    let totalTimePerMonth = element.week1 ? Number(element.week1) : 0;
    if (element.week2) totalTimePerMonth += Number(element.week2);
    if (element.week3) totalTimePerMonth += Number(element.week3);
    if (element.week4) totalTimePerMonth += Number(element.week4);
    const table = document
      .getElementById("tab")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    [
      element.title,
      element.sapId,
      element.resourceRole,
      element.month,
      totalTimePerMonth,
      "160 Euros",
      "dummy actions",
      element.id,
    ].forEach((item, index) => {
      if (index === 6) {
        const cell = newRow.insertCell(index);
        const button1 = document.createElement("button");
        button1.textContent = "Approve";
        button1.addEventListener("click", () => {
          approveItem(element.id, {
            ApprovalStatus: "Yes",
          });
        });

        const button2 = document.createElement("button");
        button2.textContent = "Update Request";
        button2.addEventListener("click", () => {
          approveItem(element.id, {
            ChangeRequest: "Requested",
          });
        });
        const button3 = document.createElement("button");
        button3.textContent = "Delete";
        button3.addEventListener("click", () => {
          deleteListItem(element.id);
        });

        cell.appendChild(button1);
        cell.appendChild(button2);
        cell.appendChild(button3);
      } else {
        if (index !== 7) {
          const cell = newRow.insertCell(index);
          cell.innerHTML = item;
        }
      }
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
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY3JtNTgxOTg1LnNoYXJlcG9pbnQuY29tQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsImlzcyI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJpYXQiOjE3MTg1OTc1MTMsIm5iZiI6MTcxODU5NzUxMywiZXhwIjoxNzE4Njg0MjEzLCJpZGVudGl0eXByb3ZpZGVyIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsIm5hbWVpZCI6ImNjNjFiZDcyLTE0MTMtNDIwNi1iODcxLTM0OWMyODk4NGRjNEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJvaWQiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJzdWIiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6ImZhbHNlIn0.Bfif7E-NA6W4qFzZd9IAUlo1HL6OlPFHDS4uVhliukMZZJFa_ENESvEPFn3BMyDBPKv1TVBHS1Gf7yoEngvVAsmSy4JCErapWNsz_zNnT8EHOFAbZ-pkcKDeJG5SLThNY6P0XWIdXTWoSrlUz5Ginou0PJDCpvczOGwZeocP8VzONnklNr3md8cXzE5xdGk45g15kej92DR16pgXtlkK06ZhkHk159Jbmx6VDawsWHCdTqiJO2rPjn8tdbOODYM1MWyAORbKzQ7MvIHvuwZI47rglekmPVTAdwAlsoGG7_nw7t6wbJFAbZ0V6kxkF7-dPFCDHXlfV_B3l1Rcu2v1og",
        "If-Match": "*",
      },
    }
  ).then((res) => {
    window.location.href = window.location.href;
  });
};
const updateListItem = async (id, body) => {
  const response = await fetch(
    `https://crm581985.sharepoint.com/sites/ProjectManagerTool/_api/web/lists/getbytitle('effort_tracking')/items/getbyid('${id}')`,
    {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        Authorization: "update with real auth token",
        "If-Match": "*",
      },
      body: body,
    }
  );
};
const approveItem = async (id, body) => {
  const bodied = {
    ...body,
    __metadata: { type: "SP.Data.Effort_x005f_trackingListItem" },
  };

  const response = await fetch(
    `https://crm581985.sharepoint.com/sites/ProjectManagerTool/_api/web/lists/getbytitle('effort_tracking')/items/getbyid('${id}')`,
    {
      method: "POST",
      headers: {
        "X-HTTP-Method": "MERGE",
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY3JtNTgxOTg1LnNoYXJlcG9pbnQuY29tQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsImlzcyI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJpYXQiOjE3MTg1OTc1MTMsIm5iZiI6MTcxODU5NzUxMywiZXhwIjoxNzE4Njg0MjEzLCJpZGVudGl0eXByb3ZpZGVyIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQGE4MTk0MjdiLTg2ZDEtNDM2Ni05MjJiLTQxNTBmYjM4YWRiNCIsIm5hbWVpZCI6ImNjNjFiZDcyLTE0MTMtNDIwNi1iODcxLTM0OWMyODk4NGRjNEBhODE5NDI3Yi04NmQxLTQzNjYtOTIyYi00MTUwZmIzOGFkYjQiLCJvaWQiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJzdWIiOiI3OWRjYjlmYy00NWY2LTQxMWMtYWRmNS1jZWVlNTBjNTgzMjciLCJ0cnVzdGVkZm9yZGVsZWdhdGlvbiI6ImZhbHNlIn0.Bfif7E-NA6W4qFzZd9IAUlo1HL6OlPFHDS4uVhliukMZZJFa_ENESvEPFn3BMyDBPKv1TVBHS1Gf7yoEngvVAsmSy4JCErapWNsz_zNnT8EHOFAbZ-pkcKDeJG5SLThNY6P0XWIdXTWoSrlUz5Ginou0PJDCpvczOGwZeocP8VzONnklNr3md8cXzE5xdGk45g15kej92DR16pgXtlkK06ZhkHk159Jbmx6VDawsWHCdTqiJO2rPjn8tdbOODYM1MWyAORbKzQ7MvIHvuwZI47rglekmPVTAdwAlsoGG7_nw7t6wbJFAbZ0V6kxkF7-dPFCDHXlfV_B3l1Rcu2v1og",
        "If-Match": "*",
      },
      body: JSON.stringify(bodied),
    }
  ).then((res) => {
    window.location.href = window.location.href;
  });
};
