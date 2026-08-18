import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
	"https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.mjs";

const resumeFile = document.querySelector("#resume-file");

resumeFile.addEventListener("change", async function () {
	const file = resumeFile.files[0];
	let i;
	let resumeText = "";

	if (!file)
		return;

	const buffer = await file.arrayBuffer();
	const loadingTask = pdfjsLib.getDocument({
		data: buffer
	});
	const pdf = await loadingTask.promise;
	const page = await pdf.getPage();
	const textContent = await page.getTextContent();
	const items = textContent.items;
	let pageNumber = pdf.numPages;
	
	i = 0;
	while (page <= pageNumber)
	{
		while (i < items.length)
		{
			resumeText += items[i].str + "\n";
			i++;
		}		
		console.log("Page",i,":", resumeText);
		pageNumber++;
	}

	console.log("Numero de páginas: ", pdf.numPages);
	console.log(textContent);
});