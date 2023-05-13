import { message } from "antd";
import moment from "moment";
import jwt_decode from "jwt-decode";


const domain = " http://localhost:8080";
const SERVER_ORIGIN = "";

const handleResponseStatus = (response, errMsg) => {
  const { status, ok } = response;

  if (status === 401) {
    localStorage.removeItem("authToken");
    //刷新页面，进入没有登陆的而态；相当于logout
    //reload的时候，ui代码要再跑一边，发现token已经没有了，于是logout
    window.location.reload();
    return;
  }
  //ok means status === 200
  if (!ok) {
    throw Error(errMsg);
  }
};

export const searchSites = (query) => {
  const city = query?.destination ?? "";
  const interest = query?.interest ?? "";

  const authToken = localStorage.getItem("authToken");
  const url = new URL(`${domain}/vacation/sites`);

  url.searchParams.append("city", encodeURIComponent(city));
  url.searchParams.append("interest", encodeURIComponent(interest));

  console.log("query---", query);
  // return [
  //   { id: 1, site_name: "site_name1", description: "description1" },
  //   { id: 2, site_name: "site_name2", description: "description2" },
  // ];
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    handleResponseStatus(response, "Fail to search apps");

    return response.json();
  });
};

export const searchUser = (query) => {
  const user_id = query;
  const url = new URL(`${domain}/user/getUser/${user_id}`);
  const authToken = localStorage.getItem("authToken");
  // return {
  //   id: 2437094113,
  //   email: "kkkk@gmail.com",
  //   password: "1111",
  //   username: "Julie",
  //   age: 24,
  //   gender: "0",
  // };

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    handleResponseStatus(response, "Fail to search user");

    return response.json();
  });
};

//password username age gender
export const updateUser = (userid, data) => {
  const authToken = localStorage.getItem("authToken");
  //http://localhost:8080/user/4271765627
  const url = `${domain}/user/${userid}`;
  const { username, password, age, gender } = data;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("age", age);
  formData.append("gender", gender);

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    handleResponseStatus(response, "Failed to update your user information");
    return response.text();
  });
};
export const addSites = (siteItem) => {
  //add vacation_id to the site object
  // 从缓存拿到当前 vacationId
  const vacationId = localStorage.getItem("vacationId");
  const {
    site_name,
    rating,
    phone_number,
    description,
    address,
    latitude,
    longitude,
    image_url,

  } = siteItem;

  // 调取接口更新 siteId 的 vacationId
  const authToken = localStorage.getItem("authToken");

  ///vacation/{vacation_id}/sites
  const url = `${domain}/vacation/${vacationId}/sites`;
  const formData = new FormData();

  formData.append("vacationId", vacationId);
  formData.append("siteName", site_name);
  formData.append("rating", rating);
  formData.append("phoneNumner", phone_number);
  formData.append("description", description);
  formData.append("address", address);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("imageURL", image_url);

  //return true;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  }).then((response) => {
    if (response.ok) {
      message.success("add sites success");
      return response.text();
    } else {
      handleResponseStatus(response, "Failed to update site vacationId");
    }
  });
};

export const vacationIdInit = (userid, query) => {
  // init vacation
  const { destination, date } = query;
  const [start_date, end_date] = date || ["", ""];
  // 调取接口更新 siteId 的 vacationId
  const authToken = localStorage.getItem("authToken");
  // url 修改为 addSite 接口
  ///vacation/init
  const url = `${domain}/vacation/init`;

  //const formData = new FormData();

  // const email = jwt.decodedToken(authToken).email;
  // formData.append("email", email);

  // let start_Date = moment(start_date);
  // let end_Date = moment(end_date);
  let start_Date_iso = new Date(start_date).toISOString().slice(0, -5) + "-05:00";
  let end_Date_iso =  new Date(end_date).toISOString().slice(0, -5) + "-05:00";
  console.log("start_Date_iso", start_Date_iso);
  console.log("end_Date_iso", end_Date_iso);
  const DurationDays = moment(new Date(end_date)).diff(
    new Date(start_date),
    "days"
  );
  // formData.append("DurationDays", DurationDays);
  // formData.append("destination", destination);
  // formData.append("start_date", start_date);
  // formData.append("end_date", end_date);
  // const formattedDate = new Date(originalDate.getTime().toISOString()
  const params = {
    destination: destination,
    start_date: start_Date_iso,
    end_date: end_Date_iso,
    duration_days: DurationDays,
    user_id: parseInt(userid),
  };
  message.success(
    `userid:${userid};destination:${destination};start_date:${start_date};end_date:${end_date}；DurationDays：${DurationDays}`
  );
  //for test
  //return Math.random();
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(params),
  }).then((response) => {
    handleResponseStatus(response, "Failed to update site vacationId");
    return response.json();
  });
};
// const signupUrl = `${SERVER_ORIGIN}/Signup`;
export const register = (credential) => {
  console.log(credential);
  const signupUrl = `${domain}/user/signup`;
  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    handleResponseStatus(response, "Fail to register");
  });
};

// const loginUrl = `${SERVER_ORIGIN}/Login`;
export const login = (credential) => {
  const loginUrl = `${domain}/user/signin`;
  return fetch(loginUrl, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Fail to login");
      }
      return response.text();
    })
    .then((token) => {
      localStorage.setItem("authToken", token);

      const decoded = jwt_decode(token);
      const userId = decoded.id;
      console.log(decoded)
      localStorage.setItem("userId", userId);
    });
};
