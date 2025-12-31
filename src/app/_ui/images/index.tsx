import MonitrPingsTable from "./originals/MonitrPingsTable.png";
import MonitrSearchMobile from "./originals/MonitrStoreSearch.png";
import MonitrNotificationsMobile from "./originals/MonitrNotifications.png";
import WrathTasks from "./originals/WrathTasks.png";
import WrathDashboard from "./originals/WrathDashboard.png";

import Image from "./image";

export default {
  MonitrPingsTable: <Image src={MonitrPingsTable} alt="Monitr Desktop Pings" />,
  MonitrSearchMobile: (
    <Image src={MonitrSearchMobile} alt="Monitr Mobile Search" />
  ),
  MonitrNotificationsMobile: (
    <Image src={MonitrNotificationsMobile} alt="Monitr Notifications" />
  ),
  WrathTasks: <Image src={WrathTasks} alt="Wrath Tasks" />,
  WrathDashboard: <Image src={WrathDashboard} alt="Wrath Dashboard" />,
};
