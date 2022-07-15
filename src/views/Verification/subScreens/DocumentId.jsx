import React, { useContext } from "react";
import ComponentProcessDocument from "../../../components/componentProcessDocument";
import ComponentQrScan from "../../../components/componentQrScan";
import CustomIndicationList from "../../../components/customIndicationList";
import LoaderApp from "../../../components/loaderApp";
import ContextLayout from "../../../context/contextLayout";
import FrontFunctions from "../../../utils/actions/frontFunctions";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOnsiX2lkIjoiNjEyZDE3YThlYmNhMzYwMDFiMzZkN2FiIiwibWVyY2hhbnQiOnsiX2lkIjoiNjEyZDE3YThlYmNhMzYwMDFiMzZkN2E5Iiwib3duZXIiOiI2MTJkMTdhOGViY2EzNjAwMWIzNmQ3YTciLCJzdWJzY3JpcHRpb25TdGF0dXMiOnsidmFsdWUiOiJhY3RpdmUiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTA5VDAwOjAwOjAwLjAwMFoifX19LCJ1c2VyIjp7Il9pZCI6IjYxMmQxN2E4ZWJjYTM2MDAxYjM2ZDdhNyJ9LCJzY29wZSI6InZlcmlmaWNhdGlvbl9mbG93IGlkZW50aXR5OnJlYWQgdmVyaWZpY2F0aW9uOnJlYWQiLCJpYXQiOjE2NTc3NDMwNzksImV4cCI6MTY1Nzc0NjY3OSwiaXNzIjoib2F1dGgyLXNlcnZlciJ9.-JjIW7om5djtlYcchCSoNurNJrTh7PM5vB5xpzrTpFY";
// const identity = "62cf27271d7cab001ca6f726";

const DocumentId = () => {
  const dataContextLayout = useContext(ContextLayout);
  const { dataProfile } = dataContextLayout;
  const frontFunctions = new FrontFunctions();

  let component = <LoaderApp />;

  // const handlerOnClickSendDocument = (e) => {
  //   const fileIndex = e.target.files[0];
  //   if (!fileIndex) return;
  //   const metadata = {
  //     inputType: "document-photo",
  //     group: 0,
  //     data: {
  //       type: "national-id",
  //       country: "MX",
  //       page: "front",
  //       filename: fileIndex.name,
  //     },
  //   };

  //   frontFunctions.handlerUploadToMetaMap(
  //     fileIndex,
  //     [metadata],
  //     identity,
  //     token
  //   );
  //   // const reader = new FileReader();
  //   // reader.readAsArrayBuffer(fileIndex);
  //   // reader.onload = async (event) => {};
  // };

  if (window.mobileCheck() === false) {
    component = (
      <div className="section-center">
        <CustomIndicationList
          stepNumber="Paso 2 de 4"
          subTitle="Escanea el QR  y realiza el proceso desde tu dispositivo móvil"
          labelReady=""
          isVisibleButton={false}
          onClick={() => {}}
        >
          <ComponentQrScan
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.origin}?token=${dataProfile.token}&amp;size=200x200`}
          />
          {/* <input type="file" onChange={handlerOnClickSendDocument} /> */}
        </CustomIndicationList>
      </div>
    );
  }

  if (window.mobileCheck() === true) {
    component = <ComponentProcessDocument />;
  }

  return component;
};

export default DocumentId;
