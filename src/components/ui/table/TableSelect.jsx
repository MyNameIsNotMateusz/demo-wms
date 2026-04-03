import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { SelectWrapper } from "./TableSelect.styles.js";

export const TableSelect = ({
    id,
    value,
    handleChange,
    handleFocus,
    handleBlur,
    options,
    isDisabled = false,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value) || null;

    useEffect(() => {
        const handleScroll = (event) => {
            if (event.target.closest(".react-select__menu")) {
                return;
            }
            setMenuOpen(false);
        };
        window.addEventListener("scroll", handleScroll, true);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, []);

    return (
        <SelectWrapper data-table-select>
            <ReactSelect
                inputId={id}
                value={selectedOption}
                onChange={(option) =>
                    handleChange && handleChange(option?.value ?? null)
                }
                onFocus={(option) => handleFocus && handleFocus(option?.value ?? null)}
                onBlur={(arg) =>
                    handleBlur && handleBlur(arg ?? selectedOption?.value ?? null)
                }
                options={options}
                isDisabled={isDisabled}
                menuIsOpen={menuOpen}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                classNames={{
                    menu: () => "react-select__menu",
                }}
                styles={{
                    container: (base) => ({
                        ...base,
                        width: "100%",
                    }),
                    control: (base) => ({
                        ...base,
                        minHeight: "30px",
                        height: "30px",
                        borderRadius: "0",
                        border: "none",
                        borderBottom: "1px solid #ccc",
                        boxShadow: "none",
                        "&:hover, &:focus, &:active": {
                            boxShadow: "none",
                            borderBottom: "1px solid #ccc",
                        },
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: 0,
                        height: "30px",
                        fontSize: "12px",
                    }),
                    input: (base) => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                    }),
                    indicatorsContainer: (base) => ({
                        ...base,
                        height: "30px",
                    }),
                    option: (base, state) => ({
                        ...base,
                        fontSize: "12px",
                        backgroundColor: state.isFocused ? "#0159c3" : base.backgroundColor,
                        color: state.isFocused ? "#fff" : "#333333",
                    }),
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                }}
            />
        </SelectWrapper>
    );
};
