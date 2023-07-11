import React from "react";
import Flash from "react-reveal/Flash";
import { VscLocation } from "react-icons/vsc";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GiPowerRing } from "react-icons/gi";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { child, get, ref, set } from "firebase/database";
import { database } from "../../config/firebase";
import dayjs from "dayjs";

function MessPage(props) {
  const [token, setToken] = React.useState(null);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    subject: Yup.string()
      .min(20, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    message: Yup.string()
      .min(20, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <Flash>
      <div className="w-ful l overflow-auto  h-full mt-auto align-middle min-h-[80vh] max-h-[80vh]   bg-[#222] rounded-r-[30px] p-[60px] text-white">
        <div className="page-title">
          <p className="text-[32px]  font-bold">Contact</p>
        </div>

        <div className="flex mt-[28px]  flex-row w-full ">
          <div className="w-1/3 px-[15px]">
            <div className="text-center w-full mb-[15px] bg-[#333] py-[30px] px-[15px]">
              <VscLocation
                className="text-[43px] text-center mx-auto"
                color="#04b4e0"
              />
              <p className="text-[15px] font-semibold mt-[15px]">Ho Chi Minh</p>
            </div>
            <div className="text-center w-full mb-[15px] bg-[#333] py-[20px] px-[10px]">
              <BsTelephone
                className="text-[43px] text-center mx-auto"
                color="#04b4e0"
              />
              <p className="text-[15px] font-semibold mt-[15px]">
                0938-227-718
              </p>
            </div>
            <div className="text-center w-full mb-[15px] bg-[#333] py-[20px] px-[10px]">
              <AiOutlineMail
                className="text-[43px] text-center mx-auto"
                color="#04b4e0"
              />
              <p className="text-[15px]  mt-[15px]">npham140201@gmail.com</p>
            </div>
            <div className="text-center w-full mb-[15px] bg-[#333] py-[20px] px-[10px]">
              <GiPowerRing
                className="text-[43px] text-center mx-auto"
                color="#04b4e0"
              />
              <p className="text-[15px] font-semibold mt-[15px]">
                FA (Help me)
              </p>
            </div>
          </div>
          <div className="w-2/3 px-[15px] ">
            <img
              className="w-full mb-[35px] h-[140px] cursor-pointer "
              alt="map"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/place/H%E1%BB%93+Ch%C3%AD+Minh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7552928,106.3655802,10z/data=!3m1!4b1!4m6!3m5!1s0x317529292e8d3dd1:0xf15f5aad773c112b!8m2!3d10.8230989!4d106.6296638!16zL20vMGhuNGg?hl=vi-VN&entry=ttu",
                  "_blank"
                );
              }}
              src="https://maps.googleapis.com/maps/api/staticmap?center=Hochiminh&zoom=13&size=3000x140&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDM-3z1SWSB8n4DDc02psUWrKo6CFbROiQ"
            />
            <p className=" text-[21px] mb-[35px] font-semibold">
              Send message to me
            </p>
            <Formik
              initialValues={{
                subject: "",
                name: "",
                message: "",
                email: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                if (token) {
                  const dbref = ref(database);
                  get(child(dbref, "Message"))
                    .then((snapshot) => {
                      if (snapshot.exists()) {
                        let data = snapshot.val();
                        data.push({
                          name: values.name,
                          email: values.email,
                          message: values.message,
                          subject: values.subject,
                          time: dayjs().format("DD/MM/YYYY"),
                        });
                        set(ref(database, "Message"), data);
                      } else {
                        set(ref(database, "Message"), [
                          {
                            name: values.name,
                            email: values.email,
                            message: values.message,
                            subject: values.subject,
                            time: dayjs().format("DD/MM/YYYY"),
                          },
                        ]);
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    })
                    .finally(() => {
                      window.location.reload();
                    });
                }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex flex-row mb-[21.5px]">
                    <div className="w-1/2 mr-[3%]">
                      <Field
                        className="bg-inherit mb-[21.5px] w-full h-[42px] active:border-[#444] active:bg-inherit text-[1rem] px-[25px] rounded-[5px] py-[10px] border-[#999] border-[2px]"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                      />
                      <ReactTooltip
                        isOpen={!errors.name ? false : true}
                        anchorId="name"
                        place="left"
                        variant="error"
                        content={errors.name}
                      />
                      <Field
                        name="email"
                        className="bg-inherit mb-[21.5px] w-full h-[42px] text-[1rem] px-[25px] rounded-[5px] py-[10px] border-[#999] border-[2px]"
                        id={"email"}
                        placeholder="Email"
                      />
                      <ReactTooltip
                        isOpen={!errors.email ? false : true}
                        anchorId="email"
                        place="left"
                        variant="error"
                        content={errors.email}
                      />

                      <Field
                        name="subject"
                        className="bg-inherit  w-full h-[42px] text-[1rem] px-[25px] rounded-[5px] py-[10px] border-[#999] border-[2px]"
                        placeholder="Subject"
                        id={"subject"}
                      />
                      <ReactTooltip
                        isOpen={!errors.subject ? false : true}
                        anchorId="subject"
                        place="left"
                        variant="error"
                        content={errors.subject}
                      />
                    </div>
                    <div className="w-1/2 ">
                      <Field
                        component="textarea"
                        name="message"
                        type="area"
                        id="message"
                        className="bg-inherit w-full h-full  text-[1rem] px-[25px] rounded-[5px] py-[10px] border-[#999] border-[2px]"
                        placeholder="Message"
                      />
                      <ReactTooltip
                        isOpen={!errors.message ? false : true}
                        anchorId="message"
                        place="right"
                        variant="error"
                        content={errors.message}
                      />
                    </div>
                  </div>
                  <ReCAPTCHA
                    className="bg-inherit mb-[21.5px]"
                    sitekey="6LemTvQmAAAAABgo0scLTH0MORLW8IIUjfNVZiUC"
                    onChange={(e) => {
                      setToken(e);
                    }}
                  />
                  <button
                    className="rounded-[30px] py-[0.8rem] px-[2.1rem] border-[2px] border-[#04b4e0]"
                    type="submit"
                  >
                    Send message
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Flash>
  );
}

export default MessPage;
