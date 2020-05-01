This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Maze Runner

Open [francismacapobre.github.io/algorithm-visualizer/](https://francismacapobre.github.io/algorithm-visualizer/) to view it in the browser.

---

### Maze Generation Algorithm

<img src="images/main.png" width="600">

Both **Wide Maze** and **Narrow Maze** are implemented with ***randomized depth-first search*** algorithm. A user may click **Generate Wide Maze**, **Generate Narrow Maze**, or click anywhere within the maze boundaries to create a custom wall pattern. Once a user finds a suitable maze, they may then click **Continue** to select a pathfinding algorithm.

---

### Uninformed & Informed Search Algorithm

<img src="images/algorithms.png" width="600">

**BFS**, **DFS**, and **A\* Search** are all implementations of the **Generic search algorithm**.

This application includes three uninformed search algorithms: ***Breadth-first search (BFS)***, ***Depth-first search (DFS)***, and ***Dijkstra's algorithm***.  

This application includes one informed search algorithm: ***A\* Search***, which uses **Manhattan Distance** as it's admissible heuristic.

*<sub>b is the maximum forward branching factor, m is the maximum path length</sup>
|                 | ***Complete*** | ***Optimal*** |      ***Time***    |        ***Space*** |
| -------------   |     ----------:|         -----:|              -----:|              -----:|
| **DFS**         | False          |         False | O(b<sup>m</sup>)   |   O(mb)            |
| **BFS**         | True           |        True   | O(b<sup>m</sup>)   |  O(b<sup>m</sup>)  |
| **Dijkstra's**  | True           |        True   |    O(b<sup>m</sup>)|  O(b<sup>m</sup>)  |
| **A\***         | True           |        True   |  O(b<sup>m</sup>)  | O(b<sup>m</sup>)   |

---

Below is a screenshot image of ***Dijkstra's algorithm*** running. All animations were implemented with ***CSS***.

<img src="images/search.png" width="600">

