import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';


import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';




type User = {
 id: number;
 name: string;
 email: string;
};


export default function TabTwoScreen() {
   const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);




 useEffect(() => {
   const load = async () => {
     try {
       const res = await fetch("https://jsonplaceholder.typicode.com/users");
       const json: User[] = await res.json();
       setData(json);
     } catch {
       setData([]);
     } finally {
       setLoading(false);
     }
   };
   load();
 }, []);


 if (loading) {
   return (
     <View style={styles.container}>
       <ActivityIndicator size="large" />
       <Text>Cargando usuarios...</Text>
     </View>
   );
 }
 return (
   <ParallaxScrollView
     headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
     headerImage={
       <IconSymbol
         size={310}
         color="#808080"
         name="chevron.left.forwardslash.chevron.right"
         style={styles.headerImage}
       />
     }>
     <ThemedView style={styles.titleContainer}>
       <ThemedText
         type="title"
         style={{
           fontFamily: Fonts.rounded,
         }}>
         Explore
       </ThemedText>
     </ThemedView>
     <View style={styles.container}>
     <Text style={styles.title}>Lista de Usuarios</Text>
     <FlatList<User>
       data={data}
       keyExtractor={(item) => String(item.id)}
       renderItem={({ item }) => (
         <View style={styles.card}>
           <Text style={styles.name}>{item.name}</Text>
           <Text>{item.email}</Text>
         </View>
       )}
       ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
     />
   </View>
   </ParallaxScrollView>
 );
}


const styles = StyleSheet.create({
 headerImage: {
   color: '#808080',
   bottom: -90,
   left: -35,
   position: 'absolute',
 },
 titleContainer: {
   flexDirection: 'row',
   gap: 8,
 },
   container: { flex: 1, padding: 20, paddingTop: 50 },
 title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
 card: { padding: 12, borderWidth: 1, borderRadius: 8 },
 name: { fontWeight: "600", marginBottom: 4 }
});
