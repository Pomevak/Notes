import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Client{
  private static int PORT = 12345;
  private Socket socket = null;
  private BufferedReader in = null;
  private String msg = "";

  public static void main(String[] args) {
    new Client();
  }

  Client(){
    try {
      this.socket = new Socket(InetAddress.getLocalHost().getHostAddress(), PORT);

      new Thread(() -> {
        try{
          BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
          PrintWriter writer = new PrintWriter(new BufferedWriter(
                  new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8)), true);

          String input;
          while(true){
            input = reader.readLine();
            writer.println(input);
          }
        }catch (IOException e){
          e.printStackTrace();
        }
      }).start();

      this.in = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
      while((this.msg = in.readLine()) != null){
        System.out.println(this.msg);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
