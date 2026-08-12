import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useTheme } from "next-themes";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "../Button";
import { useMemo, useState } from "react";
import { FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from "react-icons/fa6";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

const PDFViewer = ({ isOpen, onClose, fileUrl }) => {
  const { theme } = useTheme();
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);

  const fileName = useMemo(() => {
    if (!fileUrl) return "";
    const lastSegment = fileUrl.split("/").pop().split("?")[0];
    return decodeURIComponent(lastSegment).replace(/\.pdf$/i, "");
  }, [fileUrl]);

  const handleDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, MAX_SCALE));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, MIN_SCALE));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-1000 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <DialogPanel
          className={`w-full h-full ${
            theme === "dark" ? "bg-slate-800" : "bg-white"
          } p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0`}
        >
          <DialogTitle
            as="div"
            className={`flex items-center justify-between  font-medium pl-2  ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}
          >
            {fileName}
            <div
              className={`flex items-center justify-between  font-medium  ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}
            >
              <Button onClick={zoomIn}>
                <FaMagnifyingGlassPlus />
              </Button>
              <span>{`${Math.round(scale * 100)}%`}</span>
              <Button onClick={zoomOut}>
                <FaMagnifyingGlassMinus />
              </Button>
            </div>
            <div className="flex items-center">
              <a href={fileUrl} download={`${fileName}.pdf`}>
                <Button type="primary">Download</Button>
              </a>
              <Button onClick={onClose}>Close</Button>
            </div>
          </DialogTitle>

          <div className="max-h-[88vh] overflow-auto flex flex-col items-center">
            <Document
              file={fileUrl}
              onLoadSuccess={handleDocumentLoad}
              loading="Loading PDF..."
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                  className="mb-2"
                />
              ))}
            </Document>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PDFViewer;
