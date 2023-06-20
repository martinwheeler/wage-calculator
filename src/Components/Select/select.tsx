import { useSelect } from "downshift";
import cx from "classnames";
import { useEffect, useRef } from "react";
import "./select.scss";

interface Props {
  items: { value: string }[];
  onChange: (item: any) => void;
}

const Select = ({ items, onChange }: Props) => {
  const itemToString = (i: any) => (i ? i.value : "");
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString,
    onSelectedItemChange: ({ selectedItem }) =>
      onChange(selectedItem?.value || "hour"),
  });

  // TODO:
  // Measure the width of the text and set the width of the menu to that
  // so that the menu doesn't jump around when the text changes

  return (
    <div
      className="inline-flex flex-col"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <span
        {...getToggleButtonProps()}
        className={cx(
          "bg-black/50 rounded py-0.25 px-0.5 cursor-pointer min-w-[5rem]",
          {
            "rounded-b-none": isOpen,
          }
        )}
      >
        <span>{selectedItem ? selectedItem.value : "hour"}</span>
      </span>

      <div className="inline relative">
        <ul {...getMenuProps()} className="absolute bg-black/90 rounded-b">
          {isOpen
            ? items.map((item, index) => (
                <li
                  className={cx("py-0.25 px-0.5 cursor-pointer", {
                    "bg-blue-100": highlightedIndex === index,
                    "font-bold": selectedItem === item,
                  })}
                  key={`${item.value}${index}`}
                  {...getItemProps({ item, index })}
                >
                  <span>{item.value}</span>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Select;
