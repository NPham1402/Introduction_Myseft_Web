"use client";
import React from "react";
import dynamic from "next/dynamic";
import { VscLocation } from "react-icons/vsc";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { Turnstile } from "@marsidev/react-turnstile";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { child, get, ref, set } from "firebase/database";
import { database } from "../../config/firebase";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const INFO_CARDS = [
  { icon: VscLocation, label: "Ho Chi Minh City" },
  { icon: BsTelephone, label: "+84 938 224 718" },
  { icon: AiOutlineMail, label: "npham140201@gmail.com" },
  { icon: FiGithub,     label: "github.com/NPham1402" },
];

function MessPage() {
  const [token, setToken] = React.useState(null);
  const [sent, setSent] = React.useState(false);
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("common.errCode.tooShort"))
      .max(20, t("common.errCode.tooLong"))
      .required(t("common.errCode.required")),
    subject: Yup.string()
      .min(5, t("common.errCode.tooShort"))
      .max(50, t("common.errCode.tooLong"))
      .required(t("common.errCode.required")),
    message: Yup.string()
      .min(10, t("common.errCode.tooShort"))
      .max(200, t("common.errCode.tooLong"))
      .required(t("common.errCode.required")),
    email: Yup.string()
      .email(t("common.errCode.invalidEmail"))
      .required(t("common.errCode.required")),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (!token) return;

    const verifyRes = await fetch("/api/verify-turnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!verifyRes.ok) return;

    const dbref = ref(database);
    get(child(dbref, "Message"))
      .then((snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : [];
        data.push({
          name: values.name,
          email: values.email,
          message: values.message,
          subject: values.subject,
          isSeen: 0,
          time: dayjs().format("DD/MM/YYYY"),
        });
        return set(ref(database, "Message"), data);
      })
      .then(() => { setSent(true); resetForm(); })
      .catch(console.error);
  };

  return (
    <div className="page-enter w-full overflow-auto min-h-full bg-[#222] md:rounded-r-[30px] text-white flex flex-col">

      {/* Map */}
      <div className="px-4 md:px-[40px] pt-4 md:pt-[30px]">
        <div className="mb-[10px]">
          <span className="text-[32px] font-bold">{t("common.title.contact").toUpperCase()}</span>
        </div>
        <div
          className="cursor-pointer rounded-[12px] overflow-hidden mb-[20px]"
          onClick={() => window.open("https://maps.google.com/?q=Ho+Chi+Minh+City", "_blank")}
        >
          <MapComponent />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-[16px] md:gap-[20px] px-4 md:px-[40px] pb-[36px] flex-1">

        {/* Left: info cards */}
        <div className="grid grid-cols-2 md:grid-cols-1 md:w-[200px] md:shrink-0 gap-[10px]">
          {INFO_CARDS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-[#2a2a2a] rounded-[14px] px-[14px] py-[16px] flex flex-col items-center text-center gap-[8px] flex-1"
            >
              <Icon size={26} color="#04b4e0" />
              <p className="text-[12px] text-[#ccc] leading-[1.5]">{label}</p>
            </div>
          ))}
        </div>

        {/* Right: form */}
        <div className="flex-1 flex flex-col">
          <p className="text-[17px] font-semibold mb-[14px]">{t("common.title.sendMe")}</p>

          {sent ? (
            <div className="flex items-center justify-center flex-1 text-[#04b4e0] text-[16px] font-medium">
              ✓ {t("common.button.sendmess")}!
            </div>
          ) : (
            <Formik
              initialValues={{ subject: "", name: "", message: "", email: "" }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
                <Form className="flex flex-col gap-[12px]">
                  <div className="flex gap-[12px]">
                    {/* Name */}
                    <div className="flex-1">
                      <Field
                        name="name"
                        id="msg-name"
                        placeholder={t("common.title.fullname")}
                        className="bg-[#2a2a2a] w-full h-[44px] text-[14px] px-[16px] rounded-[10px] border border-[#444] focus:border-[#04b4e0] outline-none transition-colors"
                      />
                      <ReactTooltip isOpen={!!errors.name} anchorId="msg-name" place="top" variant="error" content={errors.name} />
                    </div>
                    {/* Email */}
                    <div className="flex-1">
                      <Field
                        name="email"
                        id="msg-email"
                        placeholder="Email"
                        className="bg-[#2a2a2a] w-full h-[44px] text-[14px] px-[16px] rounded-[10px] border border-[#444] focus:border-[#04b4e0] outline-none transition-colors"
                      />
                      <ReactTooltip isOpen={!!errors.email} anchorId="msg-email" place="top" variant="error" content={errors.email} />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Field
                      name="subject"
                      id="msg-subject"
                      placeholder={t("common.title.subject")}
                      className="bg-[#2a2a2a] w-full h-[44px] text-[14px] px-[16px] rounded-[10px] border border-[#444] focus:border-[#04b4e0] outline-none transition-colors"
                    />
                    <ReactTooltip isOpen={!!errors.subject} anchorId="msg-subject" place="top" variant="error" content={errors.subject} />
                  </div>

                  {/* Message */}
                  <div>
                    <Field
                      component="textarea"
                      name="message"
                      id="msg-message"
                      placeholder={t("common.title.message") || "Message"}
                      rows={5}
                      className="bg-[#2a2a2a] w-full text-[14px] px-[16px] py-[12px] rounded-[10px] border border-[#444] focus:border-[#04b4e0] outline-none transition-colors resize-none"
                    />
                    <ReactTooltip isOpen={!!errors.message} anchorId="msg-message" place="top" variant="error" content={errors.message} />
                  </div>

                  <Turnstile
                    siteKey="0x4AAAAAADUZ3LY80BzlNpEY"
                    onSuccess={setToken}
                    onExpire={() => setToken(null)}
                    options={{ theme: "dark" }}
                  />

                  <button
                    type="submit"
                    disabled={!token}
                    className="w-fit rounded-[30px] py-[10px] px-[32px] text-[14px] font-medium border-[2px] border-[#04b4e0] hover:bg-[#04b4e0]/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t("common.button.sendmess")}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessPage;
