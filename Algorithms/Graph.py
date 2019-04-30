class Graph:
    def __init__(self, vertex_num):
        self.vertex_num = vertex_num
        self.adj_mat = [[False] * self.vertex_num for _ in range(self.vertex_num)]
        self.visited = [False] * self.vertex_num

    def add_edge(self, start, end, directed=False):
        self.adj_mat[start][end] = True
        if not directed:
            self.adj_mat[end][start] = True

    def visit(self, vertex):
        print(vertex)
        self.visited[vertex] = True

    def dfs(self, start):
        self.visited = [False] * self.vertex_num

        def inner_dfs(vertex):
            self.visit(vertex)

            for i in range(self.vertex_num):
                if self.adj_mat[vertex][i] and not self.visited[i]:
                    inner_dfs(i)

        inner_dfs(start)

    def dfs_stack(self, start):
        def get_adjacent_unvisited_vertex(v):
            for i in range(self.vertex_num):
                if self.adj_mat[v][i] and not self.visited[i]:
                    return i

            return -1

        self.visited = [False] * self.vertex_num
        self.visit(start)
        stack = [start]

        while len(stack):
            vertex = stack[len(stack) - 1]
            next_vertex = get_adjacent_unvisited_vertex(vertex)
            if next_vertex is not -1:
                self.visit(next_vertex)
                stack.append(next_vertex)
            else:
                stack.pop()

    def bfs(self, start):
        self.visited = [False] * self.vertex_num
        queue = [start]

        while len(queue):
            vertex = queue.pop(0)
            self.visit(vertex)

            for i in range(self.vertex_num):
                if self.adj_mat[vertex][i] and not self.visited[i] and i not in queue:
                    queue.append(i)


if __name__ == '__main__':
    graph = Graph(6)
    graph.add_edge(0, 1)
    graph.add_edge(0, 2)
    graph.add_edge(0, 3)
    graph.add_edge(1, 4)
    graph.add_edge(2, 4)
    graph.add_edge(2, 3)
    graph.add_edge(2, 5)
    graph.add_edge(3, 5)
    graph.add_edge(4, 5)

    # graph.dfs(0)
    # graph.bfs(0)
    graph.dfs_stack(0)
