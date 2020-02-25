module.exports = {
    // eslint-disable-next-line no-unused-vars
    install: function (Vue, options) {
        Vue.directive('permission', {
            inserted: function (el, binding) {
                const {value} = binding;
                let exists = false;

                let permissionStr = sessionStorage.getItem("hcm_permission") || '';
                const allowPermission = permissionStr.split(",");

                if (typeof value === "string") {
                    if (value === "") {
                        return;
                    }
                    if (allowPermission.indexOf(value) !== -1) {
                        exists = true;
                    }
                }else if (Array.isArray(value)) {
                    if (value.length === 0) {
                        return;
                    }
                    for (let v of value) {
                        if (allowPermission.indexOf(v) !== -1) {
                            exists = true;
                            break;
                        }
                    }
                }
                if (!exists) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
};