import querystring from "querystring";

const callAPI = async (URL, body = null) => {
  console.log("CALL API: ", URL);
  return fetch(getEndpoint(URL), body)
    .then((response) => response.json())
    .then((response) => {
      if (!response.meta.statusCode.toString().startsWith("2")) {
        throw new Error(response.meta.message);
      }
      return response;
    });
};

export const appConfig = {
  host: "https://api.cyberteckacademy.com",
};

const Api = {
  Payment: {
    PaypalOrderCreate: () => {
      return `${getEndpoint("/course-api/create-order/paypal")}`;
    },
  },
  Support: {
    contactUs: (data) => {
      return callAPI(`/user-api/contactUs`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
  },
  Auth: {
    login: (data) => {
      return callAPI(`/user-api/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    registration: (data) => {
      return callAPI(`/user-api/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    profileFetch: (userId) => {
      return callAPI(`/user-api/profile/${userId}`, {
        // return callAPILocal(`http://192.168.0.107:5006/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    profileUpdate: (data) => {
      return callAPI(`/user-api/profile`, {
        // return callAPILocal(`http://192.168.0.107:5006/profile`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
  },

  Media: {
    post: () => {
      return `${getEndpoint("/course-api/media/upload")}`;
    },
    getImage: (code) => {
      return (
        code && `${getEndpoint(`/course-api/media/${code.split(".")[0]}/og`)}`
      );
    },
    getThumb: (code) => {
      if (!code) return false;
      return (
        code &&
        `${getEndpoint(`/course-api/media/${code.split(".")[0]}/thumb`)}`
      );
    },
  },

  Course: {
    create: (data) => {
      return callAPI(`/course-api/course`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    update: (data) => {
      return callAPI(`/course-api/course/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    load: (courseId) => {
      return callAPI(`/course-api/course/${courseId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    loadAll: (query) => {
      const qryString = query ? "?" + querystring.stringify(query) : "";
      return callAPI(`/course-api/course${qryString}`, {
        method: "GET",
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        // }
      });
    },
    fetchDetailList: (data) => {
      const id = data.userType === "TEACHER" ? 0 : parseInt(data.userId);
      return callAPI(`/course-api/course/participant/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
  },
  CourseSchedule: {
    create: (data) => {
      return callAPI(`/course-api/course/${data.courseId}/schedule`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    remove: (data) => {
      return callAPI(
        `/course-api/course/${data.courseId}/schedule/${data.scheduleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
        }
      );
    },
    load: (courseId) => {
      return callAPI(`/course-api/course/${courseId}/schedule`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    book: (data) => {
      return callAPI(`/course-api/course/bookSlot`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
  },
  Blog: {
    create: (data) => {
      return callAPI(`/blog-api/blog`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    update: (data) => {
      return callAPI(`/blog-api/blog`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    load: (blogId) => {
      return callAPI(`/blog-api/blog/${blogId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    delete: (blogId) => {
      return callAPI(`/blog-api/blog/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    loadAll: (query) => {
      const qryString = query ? "?" + query.toString() : "";
      return callAPI(`/blog-api/blog${qryString}`, {
        method: "GET",
      });
    },
  },

  School: {
    searchSchoolCourses: (data, pageSize=0) => {
      console.log("SEARCH SCHOOL: ", data, pageSize);
      return getEndpoint(`/course-api/schools/courses/search?schoolName=${data.schoolFilter}&courseName=${data.courseFilter}&grade=${data.gradeFilter}&limit=${pageSize}`)
    },
    create: (data) => {
      return callAPI(`/course-api/schools`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    update: (data) => {
      return callAPI(`/course-api/schools/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
        body: JSON.stringify(data),
      });
    },
    load: (schoolId) => {
      return callAPI(`/course-api/schools/${schoolId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    loadAll: (query) => {
      const qryString = query ? "?" + querystring.stringify(query) : "";
      return callAPI(`/course-api/schools${qryString}`, {
        method: "GET",
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        // }
      });
    },
    loadAllSchoolUrl: () => {
      return getEndpoint(`/course-api/schools`);
    },
    loadAtSchoolCourses: () => {
      console.log("LOADED ALL COURSES: ");
      return getEndpoint(`/course-api/course?courseType=AT_SCHOOL_LOCATION`);
    },
    fetchDetailList: (data) => {
      const id = data.userType === "TEACHER" ? 0 : parseInt(data.userId);
      return callAPI(`/course-api/course/participant/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
  },
  SchoolCourse: {
    loadAllEnrolledSchoolCourses: (data) => {
      const id = data.userType === "REPRESENTATIVE" ? 0 : parseInt(data.userId);
      const url = `/course-api/schools/courses/participants/${id}`;
      console.log("URL", url);
      return callAPI(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    load: (schoolId) => {
      return callAPI(`/course-api/schools/${schoolId}/courses`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
        },
      });
    },
    create: (data) => {
        return callAPI(`/course-api/schools/${data.schoolId}/courses`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify(data),
        });
      },
      update: (data) => {
        return callAPI(`/course-api/schools/${data.schoolId}/courses/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify(data),
        });
      },
      // SCHOOL COURSE BOOK
      book: (data) => {
        return callAPI(`/course-api/schools/${data.schoolId}/courses/${data.courseId}/book-slot`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
          },
          body: JSON.stringify(data),
        });
      },
  },
};
export default Api;

const getEndpoint = (url, prod = true) => {
  if (prod) {
    return `${appConfig.host}${url}`;
  }
  let tempUrl = url.split("/");
  let service = tempUrl[1];
  let uri = tempUrl.slice(2).join("/");
  console.log("URI: ", uri, "URL: ", url, "service: ", service);
  switch (service) {
    case "course-api":
      return `http://192.168.0.107:5002/${uri}`;
    case "user-api":
      return `http://192.168.0.107:5006/${uri}`;
    case "blog-api":
      return `http://192.168.0.107:5003/${uri}`;
  }
};
