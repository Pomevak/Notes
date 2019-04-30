def find_combination(n, m):
    results = []

    def find_combine(n, m, item):
        if n < 1 or m < 1:
            return

        if n == m:
            results.append(item + [n])
        
        find_combine(n-1, m, item.copy())
        item.append(n)
        find_combine(n-1, m-n, item.copy())
    
    find_combine(n, m, [])
    return results

if __name__ == "__main__":
    res = find_combination(9, 10)
    print(res)
