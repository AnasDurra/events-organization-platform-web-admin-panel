export const itemTypes = {
  TEXTFIELD: 'text-field',
  RADIO: 'radio',
  FORM_ELEMENT: 'form-element',
};
export const SidebarItemsIndex = {
  TEXTFIELD: 0,
  RADIO: 1,
};

export const SidebarItemsTypeByIndex = {
  [SidebarItemsIndex.TEXTFIELD]: itemTypes.TEXTFIELD,
  [SidebarItemsIndex.RADIO]: itemTypes.RADIO,
};
