const entries = [
  {
    slotId: 1,
    slotType: "bike",
    vehicleType: "bike",
    capacity: 2,
    count: 2,
    vehicleList: [{ assignedTo: "MH055434" }, { assignedTo: "MH055435" }],
  },

  {
    slotId: 2,
    slotType: "car",
    vehicleType: "car",
    capacity: 1,
    count: 1,
    vehicleList: [{ assignedTo: "UP011820" }],
  },
  {
    slotId: 3,
    slotType: "bike",
    vehicleType: "suv",
    capacity: 3,
    count: 3,
    vehicleList: [
      { assignedTo: "UK029001" },
      { assignedTo: "UK029002" },
      { assignedTo: "UK029003" },
    ],
  },
  {
    slotId: 4,
    slotType: "car",
    vehicleType: "suv",
    capacity: 1,
    count: 1,
    vehicleList: [{ assignedTo: "JK025911" }],
  },
  {
    slotId: 5,
    slotType: "bike",
    vehicleType: "suv",
    capacity: 1,
    count: 0,
    vehicleList: [],
  },
];

/*----------User Panel-------------*/

const userRegistration = document.getElementById("user-registration");
const showUserSlot = document.getElementById("show-user-slot");

const userSlot = document.getElementById("user-slot");
const showUserRegistration = document.getElementById("show-user-registration");

userRegistration.addEventListener("input", function () {
  let toBeSearched = userRegistration.value;
  let len = toBeSearched.length;

  if (len > 8) {
    showUserSlot.innerText = "Should be less than 9";
  } else if (len <= 7) {
    showUserSlot.innerText = "";
  } else if (len == 8) {
    var slotId = "";

    function findRegistration(value) {
      entries?.forEach((e) =>
        e.vehicleList.forEach((i) => {
          if (i.assignedTo == value.toUpperCase()) {
            slotId = e.slotId;
          }
        })
      );
    }
    findRegistration(toBeSearched);

    if (slotId !== null) {
      showUserSlot.innerText = `Your Slot Number is : ${slotId}`;
    } else {
      resultElement.textContent = "null";
    }
    // showUserSlot.innerText = slotData[0].slotId;
  }
});

function findSlot(value) {
  return entries.filter((e) => e.slotId == parseInt(value));
}

userSlot.addEventListener("input", function () {
  let toBeSearched = userSlot.value;
  const listText = document.getElementById("listText");

  if (toBeSearched == "") {
    showUserRegistration.textContent = "";
    listText.innerText = "";
  } else if (toBeSearched > 9) {
    showUserRegistration.textContent = "";
    listText.innerText = `No Valid slot number : ${toBeSearched} `;
  } else if (toBeSearched > 5 && toBeSearched <= 0) {
    listText.innerText = "";
  } else {
    const slotData = findSlot(toBeSearched);

    const arr = slotData.map((e) => e.vehicleList.filter((i) => i.assignedTo));

    if (arr.length == 0) {
      listText.innerText = `No Valid slot number : ${toBeSearched} `;
    } else {
      arr.forEach(function (no) {
        let div = document.createElement("div");
        div.textContent = no.map((i) => i.assignedTo);
        if (div.textContent == "") {
          listText.innerText = `No Vehicles allocated to slot number : ${toBeSearched} `;
        } else {
          showUserRegistration.appendChild(div);

          listText.innerText = `Vehicles allocated to slot number : ${toBeSearched} `;
        }
      });
    }
  }
});

/*----------admin Panel-------------*/
//add button
const add = document.getElementById("add");
const listText1 = document.getElementById("show-admin-slot");
var toBeSearched = "";
var emptySlot = "";

function assignToEmptySlotNo(addThis) {
  if (emptySlot > 0 && addThis.length == 8) {
    entries.forEach((e) => {
      e.vehicleList.push({
        assignedTo: addThis,
      });
    });
    listText1.innerText = `${toBeSearched} is assigned to slot number : ${emptySlot}`;
  } else {
    listText1.innerText = `Enter valid input`;
  }
}
add.addEventListener("click", function () {
  assignToEmptySlotNo(toBeSearched);
});

////////admin first input
const adminSlot = document.getElementById("admin-assign-slot");
adminSlot.addEventListener("input", function () {
  toBeSearched = adminSlot.value;

  function findEmptySlotNo() {
    entries?.forEach((e) => {
      if (e.vehicleList.length == 0) {
        emptySlot = e.slotId;
        listText1.innerText = `Slot number : ${emptySlot} is empty`;
      } else {
        listText1.innerText = `No slot empty`;
      }
    });
  }
  findEmptySlotNo();

  if (toBeSearched.length == 8 && emptySlot > 0) {
    // assignToEmptySlotNo(toBeSearched);
    listText1.innerText = `${toBeSearched} will be assigned to slot number : ${emptySlot}`;
  } else if (toBeSearched.length > 8) {
    listText1.innerText = `Number should be less than 8`;
  }
});

////////admin second input
const adminRegistration = document.getElementById("admin-registration");
const showAdmin = document.getElementById("admin-show-user-registration");

//search fun
function search(toBeSearched) {
  const listText = document.getElementById("listText2");
  entries.forEach((e) => {
    e.vehicleList.forEach((v) => {
      if (e.slotId == toBeSearched) {
        let div = document.createElement("div");
        div.textContent = v.assignedTo;
        showAdmin.appendChild(div);
        listText.innerText = `Vehicles allocated to slot number : ${toBeSearched} `;
      } else if (v.assignedTo == toBeSearched.toUpperCase()) {
        listText.innerText = `Slot number : ${e.slotId} `;
      }
    });
  });
}
adminRegistration.addEventListener("input", function () {
  toBeSearched = adminRegistration.value;
  const listText = document.getElementById("listText2");

  if (toBeSearched == "") {
    showAdmin.textContent = "";

    listText.innerText = "";
  } else if (toBeSearched > 9) {
    showAdmin.textContent = "";
    listText.innerText = "";
  } else if (toBeSearched > 5 && toBeSearched <= 0) {
    listText.innerText = "";
    showAdmin.textContent = "";
  } else {
    const slotData = findSlot(toBeSearched);
    search(toBeSearched);

    if (slotData[0]?.vehicleList.length == 0) {
      listText.innerText = `Slot number : ${toBeSearched} is Empty ! `;
    }
  }
});
