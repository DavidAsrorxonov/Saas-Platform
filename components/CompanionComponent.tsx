import React from "react";

const CompanionComponent = () => {
  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center border">
          <div className="size-75 flex items-center justify-center max-sm:size-25 mt-4 bg-primary"></div>
        </div>
      </section>
    </section>
  );
};

export default CompanionComponent;
