// data load

const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const categoryContainer = document.getElementById("category-container");

  // create Element

  data.data.forEach((category) => {
    // console.log("category");
    const div = document.createElement("div");

    // dynamics div create

    div.innerHTML = `
    <button onclick="handleLoadCategory('${category?.category_id}')" 
    class=" btn active bg-gray hover:bg-[#FF1F3D] text-lg hover:text-white rounded-md"> <a 
    class="tab hover:text-white">${category.category}</a> </button>
    `;
    categoryContainer.appendChild(div);
  });

  // console.log(data.data);
};

// category ID fetch

const handleLoadCategory = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");

    // second convert to hours and minutes
    function secondsToHMS(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      return { hours, minutes };
    }
    const postedDate = parseFloat(category?.others?.posted_date);
    const { hours, minutes } = secondsToHMS(postedDate);

    div.innerHTML = `
    
    
      <figure class="relation" >
     
        <img class="w-[312px] h-[200px] rounded-md"
        src="${category.thumbnail}"
        alt="image"
        />
    </figure>
    <div class="absolute ">
     
     ${
       postedDate
         ? `<p class="w-[170px] text-center bg-[#0000009a] text-sm text-white rounded-[4px] px-[4px] py-[2px] -mt-8 ml-[130px]">${hours} hrs ${minutes} min ago</p>`
         : ""
     } 
     </div>
    <div class="flex flex-row mt-4">
     <div>
       <img class="w-10 h-10 rounded-[40px]" 
        src="${category.authors[0].profile_picture}" alt="">
     </div>
      <div class="ml-4">
      <h2 class="card-title">${category.title}</h2>
      <div class="flex gap-2 items-center">
      <p>${category.authors[0].profile_name}</p>
      <div >${
        category.authors[0].verified
          ? `
      <img src="./img/verified.png" alt="image">
      `
          : ""
      } 
      </div>
      </div>
      <p>${category.others.views} views</p>
      

    </div>

    `;
    cardContainer.appendChild(div);
  });

  // error

  const noData = document.getElementById("sort-photo-container");

  const noDataFound = document.createElement("div");

  noDataFound.innerHTML = `

    <div class="block justify-center -mt-10">${
      data.data?.length
        ? ""
        : `<img class="mx-auto mt-10" src="./img/Icon.png" alt="img"> <br> <h1 class="text-center font-bold mb-8 text-xl lg:text-3xl">Oops!! Sorry, There is no <br> content here</h1>`
    }</div>

    

    `;

  noData.innerHTML = "";

  noData.appendChild(noDataFound);
};

// sort

const ViewsSortBy = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await res.json();
  const sortViewData = data.data;

  sortViewData.sort((a, b) => {
    a = Number.parseFloat(a.others.views);
    b = Number.parseFloat(b.others.views);
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
    return 0;
  });

  const displaySort = document.getElementById("card-container");
  displaySort.innerHTML = " ";

  sortViewData.forEach((sortDisplayAllData) => {
    function secondsToHMS(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      return { hours, minutes };
    }
    const postedDate = parseFloat(sortDisplayAllData?.others?.posted_date);
    const { hours, minutes } = secondsToHMS(postedDate);

    const div = document.createElement("div");
    div.innerHTML = `
    
    
      <figure class="relation" >
     
        <img class="w-[312px] h-[200px]"
        src="${sortDisplayAllData.thumbnail}"
        alt="image"
        />
    </figure>
    <div class="absolute ">
     
     ${
       postedDate
         ? `<p class="w-[170px] text-center bg-black text-sm text-white rounded-[4px] px-[4px] py-[2px] -mt-8 ml-[130px]">${hours} hrs ${minutes} min ago</p>`
         : ""
     } 
     </div>
    <div class="flex flex-row mt-4">
     <div>
       <img class="w-10 h-10 rounded-[40px]" 
        src="${sortDisplayAllData.authors[0].profile_picture}" alt="">
     </div>
      <div class="ml-4">
      <h2 class="card-title">${sortDisplayAllData.title}</h2>
      <div class="flex gap-2 items-center">
      <p>${sortDisplayAllData.authors[0].profile_name}</p>
      <div >${
        sortDisplayAllData.authors[0].verified
          ? `
      <img src="./img/verified.png" alt="image">
      `
          : ""
      } 
      </div>
      </div>
      <p>${sortDisplayAllData.others.views} views</p>
      

    </div>

    `;
    displaySort.appendChild(div);
  });
};

handleLoadCategory(1000);

loadCategory();
