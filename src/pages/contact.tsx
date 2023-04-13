import AppLayout from "@/components/layout/app-layout";
import React from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="w-full px-2 py-2">
      <div className="px-5 py-10 bg-white rounded-md my-2">Contacts</div>
      <div className="px-5 py-10 bg-white rounded-md my-2">Contacts</div>
      <div className="px-5 py-10 bg-white rounded-md my-2">Contacts</div>
      <div className="px-5 py-10 bg-white rounded-md my-2">Contacts</div>
      <div className="px-5 py-10 bg-white rounded-md my-2">Contacts</div>
      <div className="px-5 py-10 bg-white rounded-md my-2">last Contacts</div>
    </div>
  );
};
Contact.getLayout = function (page: any) {
  return <AppLayout>{page}</AppLayout>;
};
export default Contact;
