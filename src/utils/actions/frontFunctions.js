import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import platform from "platform";

class FrontFunctions {
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
  showMessageStatusApi = (text, status, position) => {};
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
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default FrontFunctions;
