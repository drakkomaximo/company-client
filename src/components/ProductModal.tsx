import { FC, useState } from "react";
import { ProductModalProps, formatNumber } from "../utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DocuPdf } from ".";

export const ProductModal: FC<ProductModalProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="text-white bg-green-800 p-2 rounded-md capitalize w-1/3 text-center"
        type="button"
        onClick={() => setShowModal(true)}
      >
        view
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center capitalize">
                    {product.name}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative flex justify-center items-center p-6">
                  <div className="w-1/2">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Image: {product.image}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Price: ${formatNumber({ value: product.price })}
                    </p>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Quantity: {formatNumber({value: product.quantity})}
                    </p>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Description: {product.description}
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <PDFDownloadLink
                    document={<DocuPdf product={product} />}
                    fileName={`Product${product.id}.pdf`}
                  >
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>
                        setTimeout(() => {
                          setShowModal(false);
                        }, 0)
                      }
                    >
                      Download PDF
                    </button>
                  </PDFDownloadLink>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Send PDF to email
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
