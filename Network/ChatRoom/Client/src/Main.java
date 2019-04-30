import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

class Main {
  private int[][] memo;

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int K = scanner.nextInt();
    int A = scanner.nextInt();
    int X = scanner.nextInt();
    int B = scanner.nextInt();
    int Y = scanner.nextInt();

    ArrayList<int[]> tuples = new ArrayList<>();

    for (int i = 0; i <= X; ++i) {
      for (int j = 0; j <= Y; ++j) {
        if (i * A + j * B == K)
          tuples.add(new int[]{i, j});
      }
    }

    int n = X > Y ? X : Y;
    Main combination = new Main(n, n);

    int res = 0;
    for (int[] tuple:tuples){
      res += (combination.calc(X, tuple[0]) * combination.calc(Y, tuple[1]));
      res %= 1000000007;
    }

    System.out.println(res);
  }

  Main(int n, int m) {
    memo = new int[n + 1][m + 1];
    for (int[] arr : memo) {
      Arrays.fill(arr, -1);
    }
  }

  private int calc(int n, int m) {
    if (n < m) {
      return 0;
    } else if (memo[n][m] != -1) {
      return memo[n][m];
    } else if (m == 0 || m == n) {
      memo[n][m] = 1;
    } else if (m == 1 || m == n - 1) {
      memo[n][m] = n;
    } else {
      memo[n][m] = calc(n - 1, m) + calc(n - 1, m - 1);
    }

    return memo[n][m];
  }
}
