import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CATEGORIES = ['All', 'Audio', 'Wearables', 'Smart Home', 'Photography'];
const BRANDS = [
	{ id: '1', name: 'Aerospace', icon: 'rocket-launch' },
	{ id: '2', name: 'Luxury', icon: 'diamond-stone' },
	{ id: '3', name: 'Precision', icon: 'wrench' },
	{ id: '4', name: 'Core', icon: 'chip' },
	{ id: '5', name: 'Stellar', icon: 'star-four-points' },
	{ id: '6', name: 'Vortex', icon: 'fan' },
];
const PRODUCTS = [
	{
		id: '1',
		name: 'Nexus Pro Wireless ANC',
		price: 299,
		originalPrice: 349,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyo8s8cOPxPs6GHiMbibuJRx5UhsJiRrngtKHQeQFaftfKR99R2KsMHcHJr9z9eT-QS6bTxegIVBdf-hDM6LmyYUcq2AzNyZoB9EaBHYSQploxk3kzl4ohwdWzALuORD4IRTLAreA3XsO6QfI-hiYiKJaD6xqByB8_QKUm0wCxmo_RlEMzmFq25Nxj6wOKaJyNJT-bjC1n5dcjYX4d2p3Vgk8dELElkXTlsuDHeEA9qcffvOkIHEfE3BpQaTOt3HoNDCIsmYGm0pG',
	},
	{
		id: '2',
		name: 'Chronos Watch Series 7',
		price: 450,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuyyvebdBAFwlc6KaxcJ5UUhJCX5alLjYaWzfYv2QVQZ9JBtuyxATp73vBP4zA28RTMnudbTMZL-tTyxZH_zSKeDeZsza2MCksQ0V1MVE0wycI32naSQsV1m6qQkj30UgHwlz2KWSC9u9uNZkjKmfpfhPL2NwwE3hvSs5Is6l9iwzKmXFjcO6vRuYlaY1ZkHUHK8F44M844QPB9k-GLZ9EObNjq5Atr661Ne8EkFpfTIeMRJfp4shPMsl1oVcj2K26yomItp-JQsEr',
		isNew: true,
	},
	{
		id: '3',
		name: 'Lumina Lens 85mm f/1.4',
		price: 899,
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAxRKJShrmA1IaPgjsQpGZ9YZpkLcBQU18TA2OQVazGIF9ijjhTUKqHf1IEYM6_d4blJtlpcbJYzAOLxhnq9dpauoGGxokE559Vbav9kLIFdK_lKYCZk-nKooTaC6eswc5ii33yNOD-Py4BZmBuKHOQ3twGsOEM1ShioQhcpMUGB68UcJknaKN5EbzJ5v0E7ugxkxM9-fcstBhfdvsaYA6yD_9Ht9qyQLDXnvyh9b0zzq4yiOqLcBRNOpU4AB0-OnlKrlRYUGhIpPE',
	},
];

export default function HomeScreen() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchText, setSearchText] = useState('');
	const router = useRouter();

	// Flash sale end time (configurable). Default starts at ~04:28:12 from now
	const FLASH_SALE_END = new Date(Date.now() + (4 * 3600 + 28 * 60 + 12) * 1000);
	const [remaining, setRemaining] = useState(() => Math.max(0, Math.floor((FLASH_SALE_END.getTime() - Date.now()) / 1000)));

	useEffect(() => {
		const tick = () => {
			const secs = Math.max(0, Math.floor((FLASH_SALE_END.getTime() - Date.now()) / 1000));
			setRemaining(secs);
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);

	const formatHHMMSS = (totalSeconds: number) => {
		const hrs = Math.floor(totalSeconds / 3600);
		const mins = Math.floor((totalSeconds % 3600) / 60);
		const secs = totalSeconds % 60;
		const p = (n: number) => String(n).padStart(2, '0');
		return `${p(hrs)}:${p(mins)}:${p(secs)}`;
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<View style={styles.logo}>
					<MaterialCommunityIcons name="cube" size={28} color="#2b6cee" />
						<Text style={styles.logoText}>NexusStore</Text>
					</View>
					<TouchableOpacity style={styles.notificationBtn}>
						<MaterialCommunityIcons name="bell" size={20} color="rgba(255, 255, 255, 0.9)" />
						<View style={styles.notificationBadge} />
					</TouchableOpacity>
				</View>

				{/* Search Bar */}
				<View style={styles.searchContainer}>
					<MaterialCommunityIcons name="magnify" size={16} color="rgba(255, 255, 255, 0.5)" style={{ marginRight: 12 }} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search for premium gear..."
						placeholderTextColor="rgba(255, 255, 255, 0.4)"
						value={searchText}
						onChangeText={setSearchText}
					/>
					<TouchableOpacity style={styles.micBtn}>
						<MaterialCommunityIcons name="microphone" size={18} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>

			{/* Category Filter */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoryScroll}
				contentContainerStyle={styles.categoryContent}
			>
				{CATEGORIES.map((cat) => (
					<TouchableOpacity
						key={cat}
						style={[
							styles.categoryBtn,
							selectedCategory === cat && styles.categoryBtnActive,
						]}
						onPress={() => setSelectedCategory(cat)}
					>
						<Text
							style={[
								styles.categoryText,
								selectedCategory === cat && styles.categoryTextActive,
							]}
						>
							{cat}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Hero Banner */}
			<View style={styles.heroBanner}>
				<View style={styles.heroImageWrapper}>
					<Image
						source={{
							uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyo8s8cOPxPs6GHiMbibuJRx5UhsJiRrngtKHQeQFaftfKR99R2KsMHcHJr9z9eT-QS6bTxegIVBdf-hDM6LmyYUcq2AzNyZoB9EaBHYSQploxk3kzl4ohwdWzALuORD4IRTLAreA3XsO6QfI-hiYiKJaD6xqByB8_QKUm0wCxmo_RlEMzmFq25Nxj6wOKaJyNJT-bjC1n5dcjYX4d2p3Vgk8dELElkXTlsuDHeEA9qcffvOkIHEfE3BpQaTOt3HoNDCIsmYGm0pG',
						}}
						style={styles.heroImage}
					/>
				</View>
				<View style={styles.heroContent}>
					<Text style={styles.heroLabel}>Limited Edition</Text>
					<Text style={styles.heroTitle}>
						NEW{'\n'}ARRIVALS
					</Text>
					<TouchableOpacity style={styles.heroBtn}>
						<Text style={styles.heroBtnText}>Shop Now</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Flash Sale */}
			<View style={styles.flashSale}>
				<View style={styles.flashSaleContent}>
					<MaterialCommunityIcons name="lightning-bolt" size={16} color="#f59e0b" />
					<Text style={styles.flashText}>FLASH SALE</Text>
				</View>
				<Text style={styles.flashTime}>{formatHHMMSS(remaining)}</Text>
			</View>

			{/* Brands Section */}
			<View style={styles.brandsSection}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Top Brands</Text>
					<TouchableOpacity>
						<Text style={styles.viewAllBtn}>View All</Text>
					</TouchableOpacity>
				</View>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.brandsScroll}
				>
					{BRANDS.map((brand) => (
						<View key={brand.id} style={styles.brandItem}>
							<View style={styles.brandCircle}>
								<MaterialCommunityIcons name={brand.icon as any} size={32} color="rgba(255, 255, 255, 0.9)" />
							</View>
							<Text style={styles.brandName}>{brand.name}</Text>
						</View>
					))}
				</ScrollView>
			</View>

			{/* Products Grid */}
			<View style={styles.productsGrid}>
				{PRODUCTS.map((product) => (
					<TouchableOpacity
						key={product.id}
						style={styles.productCard}
						activeOpacity={0.92}
						onPress={() => {
							const q = `?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(String(product.price))}&image=${encodeURIComponent(product.image || '')}&description=${encodeURIComponent((product as any).description || '')}`;
							router.push(`/product/${product.id}${q}`);
						}}
					>
						<View style={styles.productImageContainer}>
							{product.isNew && (
								<View style={styles.newBadge}>
									<Text style={styles.newBadgeText}>NEW</Text>
								</View>
							)}
							<TouchableOpacity style={styles.favoriteBtn}>
								<MaterialCommunityIcons name="heart" size={18} color="#fff" />
							</TouchableOpacity>
							<Image
								source={{ uri: product.image }}
								style={styles.productImage}
							/>
				
						</View>
						<Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
						<View style={styles.productFooter}>
							<View style={styles.priceWrap}>
								{product.originalPrice && (
									<Text style={styles.originalPrice}>
										${product.originalPrice}
									</Text>
								)}
								<Text style={styles.productPrice}>${product.price}</Text>
							</View>
							<TouchableOpacity style={styles.addBtn}>
								<MaterialCommunityIcons name="plus" size={18} color="#fff" />
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				))}
				{/* Skeleton Loader Card */}
				<View style={styles.productCard}>
					<View style={[styles.productImageContainer, styles.skeletonImage]} />
					<View style={styles.skeletonContainer}>
						<View style={[styles.skeletonBar, { width: '75%', height: 16 }]} />
						<View style={[styles.skeletonBar, { width: '50%', height: 12, marginTop: 8 }]} />
						<View style={styles.skeletonFooter}>
							<View style={[styles.skeletonBar, { width: 40, height: 20 }]} />
							<View style={[styles.skeletonBar, { width: 32, height: 32, borderRadius: 16 }]} />
						</View>
					</View>
				</View>
			</View>

			<View style={styles.spacer} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 24,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.05)',
	},
	headerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	logoText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '700',
		letterSpacing: -0.5,
	},
	notificationBtn: {
		position: 'relative',
		padding: 8,
	},
	notificationBadge: {
		position: 'absolute',
		top: 6,
		right: 6,
		width: 8,
		height: 8,
		backgroundColor: '#ef4444',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#050505',
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
		borderRadius: 24,
		paddingHorizontal: 16,
		height: 48,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.15)',
		marginBottom: 8,
	},
	searchInput: {
		flex: 1,
		color: '#fff',
		fontSize: 14,
		fontWeight: '500',
		padding: 0,
	},
	micBtn: {
		padding: 6,
		marginLeft: 8,
	},
	categoryScroll: {
		marginTop: 16,
		marginBottom: 12,
	},
	categoryContent: {
		paddingHorizontal: 20,
		gap: 12,
	},
	categoryBtn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	categoryBtnActive: {
		backgroundColor: '#2b6cee',
		borderColor: '#2b6cee',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 8,
	},
	categoryText: {
		color: 'rgba(255, 255, 255, 0.6)',
		fontSize: 13,
		fontWeight: '600',
	},
	categoryTextActive: {
		color: '#fff',
		fontWeight: '700',
	},
	heroBanner: {
		marginHorizontal: 20,
		marginVertical: 20,
		borderRadius: 28,
		overflow: 'hidden',
		height: 200,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#2b6cee',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
	},
	heroImageWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: -24,
	},
	heroImage: {
		width: 180,
		height: 160,
		resizeMode: 'contain',
		transform: [{ rotate: '-12deg' }, { scaleY: 1.1 }],
	},
	heroContent: {
		flex: 1,
		paddingRight: 24,
		paddingVertical: 20,
		justifyContent: 'center',
	},
	heroLabel: {
		color: 'rgba(255, 255, 255, 0.6)',
		fontSize: 10,
		fontWeight: '700',
		letterSpacing: 0.5,
		marginBottom: 4,
		textTransform: 'uppercase',
	},
	heroTitle: {
		color: '#fff',
		fontSize: 28,
		fontWeight: '900',
		lineHeight: 32,
		marginBottom: 12,
		letterSpacing: -0.5,
	},
	heroBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 20,
		alignSelf: 'flex-start',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.2)',
	},
	heroBtnText: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '700',
	},
	flashSale: {
		marginHorizontal: 20,
		marginVertical: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'rgba(245, 158, 11, 0.08)',
		borderRadius: 36,
		overflow: 'hidden',
		paddingHorizontal: 20,
		height: 56,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.12)',
		shadowColor: '#f59e0b',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.18,
		shadowRadius: 16,
		elevation: 10,
	},
	flashSaleContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	flashText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '700',
		letterSpacing: 0.5,
		textTransform: 'uppercase',
	},
	flashTime: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		fontFamily: 'monospace',
		letterSpacing: 0.5,
	},
	brandsSection: {
		marginVertical: 20,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginBottom: 16,
	},
	sectionTitle: {
		color: 'rgba(255, 255, 255, 0.4)',
		fontSize: 12,
		fontWeight: '700',
		letterSpacing: 0.5,
		textTransform: 'uppercase',
	},
	viewAllBtn: {
		color: '#2b6cee',
		fontSize: 12,
		fontWeight: '700',
	},
	brandsScroll: {
		paddingHorizontal: 20,
		gap: 20,
	},
	brandItem: {
		alignItems: 'center',
		gap: 8,
	},
	brandCircle: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: 'rgba(255, 255, 255, 0.04)',
		borderWidth: 0.5,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'rgba(255, 255, 255, 0.1)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.6,
		shadowRadius: 8,
		elevation: 4,
	},
	brandName: {
		color: 'rgba(255, 255, 255, 0.6)',
		fontSize: 11,
		fontWeight: '600',
		letterSpacing: 0.2,
	},
	productsGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 16,
		gap: 12,
		marginBottom: 12,
		justifyContent: 'space-between',
	},
	productCard: {
		width: '48%',
		backgroundColor: '#111318',
		borderRadius: 24,
		padding: 12,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		overflow: 'hidden',
		position: 'relative',
		paddingBottom: 20,
	},
	productImageContainer: {
		position: 'relative',
		width: '100%',
		aspectRatio: 4 / 5,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		borderRadius: 16,
		marginBottom: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	newBadge: {
		position: 'absolute',
		top: 8,
		left: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		zIndex: 10,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	newBadgeText: {
		color: '#fff',
		fontSize: 10,
		fontWeight: '700',
		letterSpacing: 0.2,
	},
	favoriteBtn: {
		position: 'absolute',
		top: 8,
		right: 8,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
	productName: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '600',
		marginBottom: 8,
		lineHeight: 16,
	},
	productFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	originalPrice: {
		color: 'rgba(255, 255, 255, 0.4)',
		fontSize: 11,
		textDecorationLine: 'line-through',
		marginBottom: 2,
	},
	productPrice: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: -0.3,
	},
	addBtn: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#2b6cee',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.45,
		shadowRadius: 12,
		elevation: 8,
	},
	priceWrap: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	skeletonImage: {
		backgroundColor: '#1c1f27',
		marginBottom: 12,
		overflow: 'hidden',
	},
	skeletonContainer: {
		gap: 8,
	},
	skeletonBar: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 4,
	},
	skeletonFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginTop: 4,
	},
	spacer: {
		height: 140,
	},
});

