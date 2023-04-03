let imageUpload = () => {
    let files = document.getElementById("imageupload").files;
    console.log(files);
  };
  let changeFile = () => {
    document.getElementById("imageupload").value = "";
    let ele = document.getElementById("imageupload");
    let list = new DataTransfer();
    let file = new File(["content"], "1.jpeg");
    list.items.add(file);
    ele.files = list.files;
    let files = document.getElementById("imageupload").files;
    console.log(files);
  };