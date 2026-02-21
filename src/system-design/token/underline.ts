export const underline = {
  base: [
    "relative",
    "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]",
    "after:bg-current after:origin-left after:scale-x-0",
    "after:transition-transform after:duration-300 after:ease-out",
  ].join(" "),
  active: "after:scale-x-100",
  hover: "hover:after:scale-x-100",
};
