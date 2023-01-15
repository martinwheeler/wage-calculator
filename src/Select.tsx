import Downshift, { useSelect } from "downshift";

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
    <span>
      <span>
        <span {...getToggleButtonProps()}>
          <span>{selectedItem ? selectedItem.value : "hourly"}</span>
        </span>
      </span>

      {isOpen && (
        <ul {...getMenuProps()}>
          {items.map((item, index) => (
            <li
              //   className={cx(
              //     highlightedIndex === index && "bg-blue-300",
              //     selectedItem === item && "font-bold",
              //     "py-2 px-3 shadow-sm flex flex-col"
              //   )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default Select;
