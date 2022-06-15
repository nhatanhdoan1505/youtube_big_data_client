import { Header } from "@component/common";
import { Admin } from "@component/container";
import { socket, SocketContext } from "@context/socket";
import { NextPageWithLayout } from "@models/index";

const AdminPage: NextPageWithLayout<null> = () => {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Header title="YoutubeData - Admin" />
        <Admin />
      </SocketContext.Provider>
    </>
  );
};

export default AdminPage;
//https://www.redtoolbox.io/
