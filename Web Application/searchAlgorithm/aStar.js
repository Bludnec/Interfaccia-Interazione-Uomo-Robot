function astar_search(agentI,agentJ, goalI, goalJ,path){
    /* Create start and end node with initialized values for g, h and f
    maze.terminal.write(f"actual position {self.position}")*/
    start_node = [agentI,agentJ];
    start_node.g = start_node.h = start_node.f = 0
    end_node = [goalI,goalJ];
    end_node.g = end_node.h = end_node.f = 0

    // nodes we don't visit yet
    yet_to_visit_list = [];
    // visited nodes
    visited_list = [];

    // Add the start node
    yet_to_visit_list.push(start_node);

    /* what squares do we search . search movement is left-right-top-bottom
     (4 movements) from every position */
    move = self.move()

    // Loop until you find the end
    while (yet_to_visit_list.length > 0){

        // Get the current node
        current_node = yet_to_visit_list[0]
        current_index = 0
        for index, item in enumerate(yet_to_visit_list):
            if item.f < current_node.f:
                current_node = item
                current_index = index

        // Pop current node out off yet_to_visit list, add to visited list
        yet_to_visit_list.pop(current_index)
        visited_list.append(current_node)

        // test if goal is reached
        if (current_node == end_node){
            return self.return_path(current_node, maze)
        }
        // Generate children from all adjacent squares
        children = self.actions(move, current_node, maze)

        // Loop through children
        for child in children:

            // Child is on the visited list (search entire visited list)
            if len([visited_child for visited_child in visited_list if visited_child == child]) > 0:
                continue
            // Create the f, g, and h values
            child.g = current_node.g + self.cost
            // Heuristic costs calculated here, this is using eucledian distance
            child.h = (((child.position[0] - end_node.position[0]) ** 2) +
                       ((child.position[1] - end_node.position[1]) ** 2))

            child.f = child.g + child.h

            // Child is already in the yet_to_visit list and g cost is already lower
            if len([i for i in yet_to_visit_list if child == i and child.g > i.g]) > 0:
                continue
            // Add the child to the yet_to_visit list
            yet_to_visit_list.append(child)
    }
}

/**
 * Funzione che restituisce la cella 
 * dell'area richiesta più vicina all'agente
 * ex. area= cucina, restiuisce la cella più vicino all'agente
 * che ha zona = cucina,
 */
function nearestCell(agentI,agentJ,area){
    var nearestCell;
    return nearestCell;
}