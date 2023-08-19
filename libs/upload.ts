const upload = async (imagePath: string) => {
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default upload;
