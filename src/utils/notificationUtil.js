export const requestPermission = () => {
    return new Promise((resolve, reject) => {
        Notification.requestPermission().then(result => {
            if (result === 'granted') {
                resolve();
            } else {
                reject();
            }
        }).catch(err => {
            console.log(err);
        });
    });

};

export const showNotification = (title, content, icon = '', tag = '') => {
    requestPermission().then(() => {
        const notification = new Notification(title, {
            body: content,
            icon,
            tag,
        });

        notification.onshow = () => {
            console.log("通知显示成功");
        };
    }).catch(() => {
        console.log('用户拒绝授权');
    });
};