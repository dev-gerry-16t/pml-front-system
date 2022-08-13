import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import styled from "styled-components";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import { callGlobalActionApi } from "../../utils/actions/actions";
import AcceptNotify from "../../views/Notification/AcceptNotify";
import CarInformation from "../../views/CarInfo/CarInformation";
import { useNavigate } from "react-router-dom";
import FrontFunctions from "../../utils/actions/frontFunctions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ContextLayout from "../../context/contextLayout";
import Verification from "../../views/Verification/Verification";
import FinishVerification from "../../views/FinishVerification/FinishVerification";
import CheckList from "../../views/CheckList/CheckList";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import IconLogout from "../../assets/icons/iconLogout";
import CustomButton from "../../components/customButton";

const max_width = "820px";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-size: 16px;
  font-family: "Lato";
  background: var(--color-backGround-light);
  box-sizing: border-box;
  @media screen and (max-width: ${max_width}) {
    font-size: 14px;
  }
  @media screen and (max-width: 420px) {
    font-size: 12px;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 4.6em;
  padding: 1em;
  box-sizing: border-box;
  background: var(--color-backGround-section);
  box-shadow: 0px 6px 15px rgba(192, 192, 192, 0.69);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-pml {
    width: 11em;
    height: 2.5em;
  }
`;

const DefaultLayout = (props) => {
  const { dataProfile, callGlobalActionApi } = props;
  const navigate = useNavigate();

  const [idItem, setIdItem] = useState(null);
  const [idPawn, setIdPawn] = useState(null);
  const [dataConfigStep, setDataConfigStep] = useState([]);

  const frontFunctions = new FrontFunctions();

  const handlerGetPipeLine = async () => {
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser: dataProfile.idSystemUser,
          idLoginHistory: dataProfile.idLoginHistory,
          idCustomer: null,
        },
        null,
        API_CONSTANTS.SYSTEM_USER.GET_PIPELINE,
        "POST",
        true
      );
      const responseResult =
        isEmpty(response.response) === false &&
        isNil(response.response.pipeline) === false &&
        isEmpty(response.response.pipeline) === false
          ? response.response.pipeline
          : {};
      const responsePipeLine =
        isEmpty(responseResult) === false &&
        isNil(responseResult.pipeline) === false &&
        isEmpty(responseResult.pipeline) === false
          ? responseResult.pipeline
          : [];
      const responseIdItem =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idItem) === false &&
        isEmpty(responseResult.idItem) === false
          ? responseResult.idItem
          : null;
      const responseIdPawn =
        isEmpty(responseResult) === false &&
        isNil(responseResult.idPawn) === false &&
        isEmpty(responseResult.idPawn) === false
          ? responseResult.idPawn
          : null;
      setIdItem(responseIdItem);
      setIdPawn(responseIdPawn);
      const findCurrentScreen = responsePipeLine.find((rowFind) => {
        return rowFind.isCompleted === false && rowFind.isCurrent === true;
      });
      if (isNil(findCurrentScreen) === false) {
        setDataConfigStep(findCurrentScreen);
        navigate(findCurrentScreen.path);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerSetPipeLineStep = async (data, id) => {
    try {
      await callGlobalActionApi(
        {
          ...data,
          idSystemUser: dataProfile.idSystemUser,
          idLoginHistory: dataProfile.idLoginHistory,
          idCustomer: null,
        },
        id,
        API_CONSTANTS.SYSTEM_USER.SET_PIPELINE_STEP,
        "PUT",
        true
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  window.mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  useEffect(() => {
    if (isNil(dataProfile)) {
      navigate("/logout");
    } else {
      handlerGetPipeLine();
    }
  }, []);

  return (
    <Container>
      <ContextLayout.Provider
        value={{
          idItem,
          idPawn,
          dataConfigStep,
          dataProfile: props.dataProfile,
          getPipeLine: async () => {
            try {
              await handlerGetPipeLine();
            } catch (error) {
              throw error;
            }
          },
          setPipeLine: async (data, id) => {
            try {
              await handlerSetPipeLineStep(data, id);
            } catch (error) {
              throw error;
            }
          },
        }}
      >
        <Header>
          <img
            className="logo-pml"
            src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logo-prenda-light.png"
            alt="Imagen-ciudad"
          />
          <div>
            <CustomButton
              formatType="close"
              onClick={() => {
                navigate("/logout");
              }}
            >
              <IconLogout size="2em" />
            </CustomButton>
          </div>
        </Header>
        {isNil(dataProfile) === false && (
          <Routes>
            <Route path="accept-notify" element={<AcceptNotify />} />
            <Route path="car-information" element={<CarInformation />} />
            <Route path="user-verification/*" element={<Verification />} />
            <Route
              path="finish-verification"
              element={<FinishVerification />}
            />
            <Route path="check-list/*" element={<CheckList />} />
          </Routes>
        )}
      </ContextLayout.Provider>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
  purgeStore: () => dispatch({ type: "PURGE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
