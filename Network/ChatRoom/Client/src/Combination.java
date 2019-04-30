import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

class Combination {
  private int[][] memo;
  private int n;
  private int m;

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
    Combination combination = new Combination(n, n);

    int res = 0;
    for (int[] tuple:tuples){
      res += (combination.calc(X, tuple[0]) * combination.calc(Y, tuple[1]));
      res %= 1000000007;
    }

    System.out.println(res);
  }

  Combination(int n, int m) {
    this.n = n;
    // this.m = n - m < m ? n - m : m;
    this.memo = new int[n + 1][m + 1];
    for (int[] arr : this.memo) {
      Arrays.fill(arr, -1);
    }
  }

  private int calc(int n, int m) {
    if (n < m) {
      return 0;
    } else if (this.memo[n][m] != -1) {
      return this.memo[n][m];
    } else if (m == 0 || m == n) {
      this.memo[n][m] = 1;
    } else if (m == 1 || m == n - 1) {
      this.memo[n][m] = n;
    } else {
      this.memo[n][m] = calc(n - 1, m) + calc(n - 1, m - 1);
    }

    return this.memo[n][m];
  }
}
