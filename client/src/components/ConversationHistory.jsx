import React from 'react';

const ConversationHistory = ({ conversations, isOpen }) => {
  if (!isOpen) return null;

  // Group conversations by date
  const groupedConversations = conversations.reduce((groups, convo) => {
    const date = new Date(convo.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(convo);
    return groups;
  }, {});

  // Sort dates in reverse chronological order
  const sortedDates = Object.keys(groupedConversations).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100vh',
      width: '450px',
      backgroundColor: 'rgba(255, 255, 255, 0.97)',
      borderLeft: '4px solid black',
      zIndex: 5,
      overflowY: 'auto',
      padding: '80px 20px 20px 20px',
      fontFamily: 'Silkscreen, cursive',
      boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.3)',
      animation: 'slideInRight 0.3s ease-out',
      backgroundImage: 'linear-gradient(45deg, rgba(255,215,0,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,215,0,0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,215,0,0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,215,0,0.05) 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
    }}>
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          }
          ::-webkit-scrollbar-thumb {
            background: #FFD700;
            border: 2px solid black;
            border-radius: 5px;
          }
        `}
      </style>
      
      <h2 style={{
        fontSize: '1.8rem',
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333',
        textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
        borderBottom: '3px solid rgba(0,0,0,0.1)',
        paddingBottom: '15px',
        position: 'relative'
      }}>
        Conversations
        <div style={{
          position: 'absolute',
          bottom: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '3px',
          background: '#FFD700',
        }}/>
      </h2>
      
      {conversations && conversations.length > 0 ? (
        sortedDates.map((date, dateIndex) => (
          <div key={date}>
            {/* Date heading */}
            <div style={{
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              padding: '10px 15px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-out forwards',
              animationDelay: `${dateIndex * 0.1}s`,
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backdropFilter: 'blur(5px)',
              marginTop: dateIndex > 0 ? '30px' : '0'
            }}>
              {new Date(date).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {/* Conversations for this date */}
            {groupedConversations[date].map((convo, index) => (
              <div 
                key={convo.timestamp}
                style={{
                  backgroundColor: 'white',
                  border: '3px solid black',
                  borderRadius: '12px',
                  padding: '15px 20px',
                  marginBottom: '15px',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                  animation: 'fadeIn 0.5s ease-out forwards',
                  animationDelay: `${(dateIndex * 0.1) + (index * 0.05)}s`,
                  opacity: 0
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '10px',
                  padding: '8px',
                  background: 'rgba(255,215,0,0.1)',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                  <div style={{
                    flex: 1,
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    {convo.character1Name} & {convo.character2Name}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>
                    {new Date(convo.timestamp).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.85rem',
                  color: '#444',
                  paddingLeft: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ minWidth: '20px' }}>🗨️</span>
                    <span>{convo.character1Name}: {convo.message1}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ minWidth: '20px' }}>💭</span>
                    <span>{convo.character2Name}: {convo.message2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9rem',
          marginTop: '30px',
          fontStyle: 'italic'
        }}>
          No conversations yet...
        </div>
      )}
    </div>
  );
};

export default ConversationHistory; 