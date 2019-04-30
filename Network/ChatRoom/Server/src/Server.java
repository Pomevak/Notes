import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server {
  //定义相关的参数,端口,存储Socket连接的集合,ServerSocket对象
  //以及线程池
  private static final int PORT = 12345;
  private static ArrayList<Socket> clients = new ArrayList<>();
  private ServerSocket server = null;
  private ExecutorService executorService = null;

  Server() {
    try {
      this.server = new ServerSocket(PORT);
      this.executorService = Executors.newCachedThreadPool(); //创建线程池
      System.out.println("服务端运行中...\n");

      while (true) {
        Socket client = this.server.accept();  //接受客户端连接
        clients.add(client);
        this.executorService.execute(new Service(client));
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  class Service implements Runnable {
    private Socket socket;
    private BufferedReader in = null;
    private String msg = "";

    Service(Socket socket) {
      this.socket = socket;
      try {
        this.in = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
        this.msg = "用户:" + this.socket.getInetAddress() + "~加入了聊天室" + "当前在线人数:" + clients.size();
        this.sendMessage();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    //为连接上服务端的每个客户端发送信息
    private void sendMessage() {
      System.out.println(this.msg);
      for (Socket client : clients) {
        try {
          PrintWriter out = new PrintWriter(new BufferedWriter(
                  new OutputStreamWriter(client.getOutputStream(), StandardCharsets.UTF_8)), true);
          out.println(this.msg);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }

    @Override
    public void run() {
      try {
        while ((this.msg = this.in.readLine()) != null) {
          if (this.msg.equals("bye")) {
            System.out.println("~~~~~~~~~~~~~");
            clients.remove(this.socket);

            this.in.close();
            this.msg = "用户:" + socket.getInetAddress() + "退出:" + "当前在线人数:" + clients.size();
            socket.close();
            this.sendMessage();
            break;
          } else {
            this.msg = socket.getInetAddress() + "   说: " + this.msg;
            this.sendMessage();
          }
        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
