import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import isString from "lodash/isString";
import platform from "platform";

// Document field validation failed.
// Document photo is too blurry.
// Document photo is cropped.
// Document photo resolution is too low.
// Unexpected error in document reading.
// Document photo has no text.
// Document photo has no face (for validation steps that require a face).
// Document photo is in grayscale.
// Document photo is a screen shot.
// User must upload a different photo.
// Document photo does not match a known document template.
// Document photo is missing some required fields.
// Some required fields from the document use an invalid format.
// Document photo has no Machine-Readable Zone (MRZ, for validation steps that require one).
// Document photo has corrupted.
// Machine-Readable Zone
// (MRZ, for validation steps that require one).
// Document photo has no PDF417 barcode (for validation steps that require one).
// Document photo has corrupted PDF417 barcode (for validation steps that require one).
// Document type claimed by user and document type detected from photo are different.
// Document country claimed by user and document country detected from document photo are different.
// Selfie photo is unusable.
// Video conversion failed.
// Multiple simultaneous faces are detected in the video.
// No faces detected in the video.

const messageApiMati = {
  "documePhoto.badText":
    "La validación del campo del documento falló, verifica que sea legible y vuelve a intentarlo.",
  "documentPhoto.blurryText":
    "La foto del documento está demasiado borrosa, verifica que sea legible y vuelve a intentarlo.",
  "documentPhoto.croppedDocument":
    "La foto del documento está recortada, vuelve a intentarlo.",
  "documentPhoto.smallImageSize":
    "La resolución de la foto del documento es demasiado baja, vuelve a intentarlo.",
  "documentPhoto.unexpectedData":
    "Error inesperado en la lectura del documento, vuelve a intentarlo.",
  "documentPhoto.noText":
    "La foto del documento no tiene texto, vuelve a intentarlo.",
  "documentPhoto.noFace":
    "La foto del documento no tiene rostro (para los pasos de validación que requieren un rostro), vuelve a intentarlo.",
  "documentPhoto.grayscaleImage":
    "La foto del documento está en escala de grises, vuelve a intentarlo.",
  "documentPhoto.screenPhoto":
    "La foto del documento es una captura de pantalla, vuelve a intentarlo con un documento original.",
  "documentPhoto.noDocument": "El usuario debe subir una foto diferente.",
  "documentPhoto.missingFields":
    "La foto del documento no coincide con una plantilla de documento conocida.",
  "documentPhoto.wrongFormat":
    "A la foto del documento le faltan algunos campos obligatorios.",
  "documentPhoto.noMrz":
    "Algunos campos obligatorios del documento utilizan un formato no válido.",
  "documentPhoto.badMrz":
    "La foto del documento no tiene una zona legible para los pasos de validación que la requieren",
  "documentPhoto.noPdf417": "La foto del documento se ha dañado.",
  "documentPhoto.badPdf417":
    "La foto del documento tiene un código de barras PDF417 dañado (para los pasos de validación que lo requieren).",
  "documentPhoto.typeMismatch":
    "El tipo de documento indicado por el usuario y el tipo de documento detectado a partir de la foto son diferentes.",
  "documentPhoto.countryMismatch":
    "El país del documento indicado por el usuario y el país del documento detectado a partir de la foto del documento son diferentes.",
  "selfiePhoto.validationError": "La foto selfie no se puede usar.",
  "voiceVideo.conversionFailed": "La conversión de video falló.",
  "voiceVideo.multipleFaces":
    "Se detectan múltiples rostros simultáneos en el video.",
  "voiceVideo.noFace": "No se detectan rostros en el video.",
};
class FrontFunctions {
  getExtensionFile = (str) => {
    let extension = "";
    if (isEmpty(str) === false && isString(str) === true) {
      const splitType = str.split("/");
      if (splitType.length === 2) {
        extension = `${splitType[splitType.length - 1]}`;
      }
    }
    return extension;
  };
  parseFormatCurrency = (money, fraction, maxFraction) => {
    let resultNumber = "";
    if (isNil(money) === false) {
      const formatMoneyJson = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: fraction,
        maximumFractionDigits: maxFraction || 20,
      };
      const locale = "en-US";
      const moneyFormat = new Intl.NumberFormat(locale, formatMoneyJson);
      resultNumber = moneyFormat.format(money);
    }
    return resultNumber;
  };
  showMessageStatusApi = (text, status) => {
    const event = new CustomEvent("displayMessage", {
      detail: { message: text, type: status },
    });
    document.dispatchEvent(event);
  };
  letterInitialName = (name) => {
    let nameInitial = "";
    if (isEmpty(name) === false) {
      nameInitial = name[0].toUpperCase();
    }
    return nameInitial;
  };
  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  handlerGetOperationType = (data) => {
    const arrayData = isEmpty(data) == false ? JSON.parse(data) : [];
    let message = "";
    if (isEmpty(arrayData) === false) {
      const findCondition = arrayData.find((row) => {
        return row.queryCondition == 7;
      });
      if (isEmpty(findCondition) === false && findCondition.compValue == 1) {
        message = "renta";
      }
      if (isEmpty(findCondition) === false && findCondition.compValue == 2) {
        message = "venta";
      }
    }
    return message;
  };
  handlerDetectDevice = () => {
    const info = {
      name: platform.name,
      version: platform.version,
      product: platform.product,
      manufacturer: platform.manufacturer,
      layout: platform.layout,
      os: platform.os.toString(),
      description: platform.description,
      lang: window.navigator.language || navigator.browserLanguage,
    };
    return info;
  };
  handlerUploadToMetaMap = async (
    file,
    metaData,
    identity,
    token,
    documentType,
    nameFile
  ) => {
    try {
      const form = new FormData();
      form.append("inputs", JSON.stringify(metaData));
      file.forEach((element, ix) => {
        form.append(documentType, element, `${nameFile}-${ix + 1}.jpeg`);
      });
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      options.body = form;
      const fetchDocument = await fetch(
        `https://api.getmati.com/v2/identities/${identity}/send-input`,
        options
      );
      const response = await fetchDocument.json();

      if (isEmpty(response) === false) {
        for (const element of response) {
          if (element.error) {
            throw messageApiMati[element.error.code];
          }
        }
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default FrontFunctions;
