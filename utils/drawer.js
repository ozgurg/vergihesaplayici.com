const CLASS_NAME = "state--v-navigation-drawer-opened";

const openDrawer = () => {
    document.documentElement.classList.add(CLASS_NAME);
};

const closeDrawer = () => {
    document.documentElement.classList.remove(CLASS_NAME);
};

export {
    openDrawer,
    closeDrawer
};
