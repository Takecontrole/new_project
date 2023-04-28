import React from "react";

export default function PageComponent({  children }) {
  return (
    <>
      
      <main>
        <div className="">
          {children}
        </div>
      </main>
    </>
  );
}
