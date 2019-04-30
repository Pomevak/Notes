class Combination:
    def __init__(self, n):
        self.memo = [[-1] * (n + 1)] * (n + 1)

    def calc(self, n, m):
        if n < m:
            return 0

        if self.memo[n][m] > -1:
            return self.memo[n][m]

        if m == 1 or m == n - 1:
            return n

        if m == 0:
            return 1

        if m < 5:
            tmp = 1;
            for i in range(m):
                tmp *= (n - i) / (m - i)
            self.memo[n][m] = tmp
        elif self.memo[n][n - m] > -1:
            self.memo[n][m] = self.memo[n][n - m]
        else:
            self.memo[n][m] = self.calc(n - 1, m) + self.calc(n - 1, m - 1)

        return self.memo[n][m]


if __name__ == "__main__":
    K = int(input())
    line = input()
    nums = line.split(' ')
    for i in range(len(nums)):
        nums[i] = int(nums[i])

    A, X, B, Y = nums

    tuples = []
    for i in range(X + 1):
        for j in range(Y + 1):
            if i * A + j * B == K:
                tuples.append((i, j))

    comb = Combination(X if X > Y else Y)
    res = 0
    for t in tuples:
        tmp1 = comb.calc(X, t[0])
        tmp2 = comb.calc(Y, t[1])
        res += (tmp1 * tmp2) % 1000000007

    res %= 1000000007
    print(int(res))
