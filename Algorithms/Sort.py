class Sort:
    @staticmethod
    def bubble_sort(arr):
        for k in range(len(arr) - 1):
            for i in range(len(arr) - k - 1):
                if arr[i] > arr[i + 1]:
                    arr[i], arr[i + 1] = arr[i + 1], arr[i]

        return arr

    @staticmethod
    def selection_sort(arr):
        for k in range(len(arr) - 1):
            index = k
            for i in range(k, len(arr)):
                if arr[i] < arr[index]:
                    index = i

            arr[k], arr[index] = arr[index], arr[k]

        return arr

    @staticmethod
    def direct_insertion_sort(arr):
        for k in range(len(arr)):
            for i in range(k - 1, -1, -1):
                if arr[i + 1] >= arr[i]:
                    break

                arr[i], arr[i + 1] = arr[i + 1], arr[i]

        return arr

    @staticmethod
    def binary_insertion_sort(arr):
        for k in range(1, len(arr)):
            start, end = 0, k - 1
            while start < end:
                mid = (start + end) // 2 + 1
                if arr[mid] > arr[k]:
                    end = mid - 1
                else:
                    start = mid + 1

            for i in range(k - 1, start - 1, -1):
                arr[i], arr[i + 1] = arr[i + 1], arr[i]

        return arr

    @staticmethod
    def shell_sort(arr):
        interval = len(arr)
        while interval > 1:
            interval = interval // 3 + 1
            for i in range(interval):
                for j in range(i + interval, len(arr), interval):
                    for k in range(j - interval, i - 1, -interval):
                        if arr[k + interval] >= arr[k]:
                            break

                        arr[k + interval], arr[k] = arr[k], arr[k + interval]

        return arr

    @staticmethod
    def quick_sort(arr):
        if len(arr) <= 1:
            return arr

        i, j, k = 0, len(arr) - 1, 0
        while i < j:
            while i <= j:
                if arr[j] < arr[k]:
                    arr[j], arr[k] = arr[k], arr[j]
                    k = j
                    break
                j -= 1

            while i <= j:
                if arr[i] > arr[k]:
                    arr[i], arr[k] = arr[k], arr[i]
                    k = i
                    break
                i += 1

        return Sort.quick_sort(arr[:k]) + arr[k:k + 1] + Sort.quick_sort(arr[k + 1:])

    @staticmethod
    def heap_sort(arr):
        def bottom_up(root, end):
            left = 2 * root + 1
            right = 2 * root + 2

            if right <= end and arr[right] > arr[root]:
                arr[root], arr[right] = arr[right], arr[root]

            if left <= end and arr[left] > arr[root]:
                arr[root], arr[left] = arr[left], arr[root]

        length = len(arr)
        for k in range(length):
            for i in range(length - k - 1, -1, -1):
                bottom_up(i, length - k - 1)

            arr[0], arr[length - k - 1] = arr[length - k - 1], arr[0]

        return arr

    @staticmethod
    def merge_sort(arr):
        def merge(left, right):
            i, j = 0, 0
            ret = []
            while i < len(left) and j < len(right):
                if right[j] < left[i]:
                    ret.append(right[j])
                    j += 1
                else:
                    ret.append(left[i])
                    i += 1

            if i < len(left):
                ret += left[i:]
            if j < len(right):
                ret += right[j:]

            return ret

        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = Sort.merge_sort(arr[:mid])
        right = Sort.merge_sort(arr[mid:])

        return merge(left, right)


if __name__ == "__main__":
    arr = [9, 1, 43, 45, 63, 3, 6, 2, 78, 21, 4]
    print(Sort.heap_sort(arr))
