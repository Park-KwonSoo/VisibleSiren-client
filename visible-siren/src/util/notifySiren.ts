import fireImg from '../assets/fire.png';

const notification = (title: string, options: any) => {
    // if (!('Notification' in window)) {
    // 	return
    // }
    /* 권한 요청 부분 */
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                /* 권한을 요청받고 nofi를 생성해주는 부분 */
                new Notification(title, options);
            } else {
                return
            }
        })
    } else {
        /* 권한이 있을때 바로 noti 생성해주는 부분 */
        new Notification(title, options);
    }

};

const triggerNotif = () => {
    notification('화재 알림', {
        body: '불이 났습니다. 대피하세요!!!',
        icon: fireImg,
    })
};

export default triggerNotif;