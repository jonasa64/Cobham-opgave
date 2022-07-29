const fetchData = async (path = "") => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts${path}`
    );
    return await res.json();
  } catch (error) {
    return Error("Could not find any posts");
  }
};

export default fetchData;
