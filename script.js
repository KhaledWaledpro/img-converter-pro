function convertImage() {
  const input = document.getElementById('imageInput');
  const format = document.getElementById('formatSelect').value;
  const downloadLink = document.getElementById('downloadLink');

  if (!input.files || input.files.length === 0) {
    alert("يرجى اختيار صورة أولاً.");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "converted." + format.split("/")[1];
        downloadLink.style.display = "inline-block";
        downloadLink.textContent = "تحميل الصورة";
      }, format);
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}
