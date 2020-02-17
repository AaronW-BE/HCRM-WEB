module.exports = {
    install: function (Vue, options) {
        console.log(options);
        Vue.directive('permission', {
            inserted: function (el, binding) {
                const {value} = binding;
                let exists = false;

                let permissionStr = sessionStorage.getItem("hcm_permission") || '';
                const allowPermission = permissionStr.split(",");

                if (typeof value === "string") {
                    if (allowPermission.indexOf(value) !== -1) {
                        exists = true
                    }
                }else if (Array.isArray(value)) {
                    for (let v of value) {
                        if (allowPermission.indexOf(v) !== -1) {
                            exists = true;
                            break;
                        }
                    }
                }
                console.log(exists, value);
                if (!exists) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
};