const CLASS_NAME = "state--v-navigation-drawer-opened";

export const openDrawer = () => {
    document.documentElement.classList.add(CLASS_NAME);
};

export const closeDrawer = () => {
    document.documentElement.classList.remove(CLASS_NAME);
};
