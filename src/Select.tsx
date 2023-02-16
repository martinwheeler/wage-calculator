import Downshift, { useSelect } from "downshift";
import cx from "classnames";

interface Props {
  items: { value: string }[];
}

const Select = ({ items }: Props) => {
  const itemToString = (i: any) => (i ? i.value : "");
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString,
  });

  return (
    <div className="inline-flex flex-col">
      <span
        {...getToggleButtonProps()}
        className="bg-black/50 rounded py-0.25 px-0.5 cursor-pointer"
      >
        <span>{selectedItem ? selectedItem.value : "hourly"}</span>
      </span>

      <div className="inline relative">
        {isOpen && (
          <ul {...getMenuProps()} className="absolute">
            {items.map((item, index) => (
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
