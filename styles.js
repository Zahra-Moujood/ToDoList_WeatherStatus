import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2D09C", // Light yellow
    padding: 20,
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366", // Dark blue
    textShadowOffset: { width: 1, height: 1 },
  },
  input: {
    borderColor: "#E2D09C",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 14,
    backgroundColor: "#fff",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#B23D3D", // Red button
    padding: 14,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
  },
  taskItem: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
  deleteAllButton: {
    flexDirection: "row",
    backgroundColor: "#B23D3D",
    padding: 14,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  deleteAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
